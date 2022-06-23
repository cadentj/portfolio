import ReactDOM from 'react-dom'
import { Box, Typography } from '@mui/material';
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CubeTextureLoader, Vector3 } from "three";
import { Html, OrbitControls, Loader } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

// Dummy target for camera lerp
const dummy = new Vector3()
// Mouse tracking library data
let trackedX;
let trackedY;
let width;
let height;
// Frame updated ship position
let x = 0;
let y = 0;
// Has camera reached ship on scroll
// Moved out of milky method to prevent it from reloading on state update
let reached = false;
// Text doesn't render initially for some reason, but all other meshes do
// When the milky way mesh renders, it updates state to render in the lagging text
let hasRendered = false;

function BlackBox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    const texture = loader.load([
        "./square.png",
        "./square.png",
        "./square.png",
        "./square.png",
        "./square.png",
        "./square.png",
    ]);

    // Set the scene background property to the resulting texture.
    scene.background = texture;
    return null;
}

const MiningStation = ({ handleDoubleClick }) => {
    const gltf = useLoader(GLTFLoader, "./station/scene.gltf");

    const ref = useRef();
    useFrame(() => (ref.current.rotation.y += 0.01));

    const planetMesh = <mesh
        ref={ref}
        // Actual position
        position={[10, -2, 15]}
    >
        // Position around which the station rotates
        <primitive object={gltf.scene} position={[-1, 0, 4.65]} scale={0.1} />
    </mesh>;

    return planetMesh;
};


const Text = ({active}) => {
    if (!active) {
        return <Html fullscreen>
            <Box sx={{ mt: 10, ml: 5 }}>
                <Typography style={{ fontFamily: 'Source Code Pro', fontSize: 20, color: 'white' }}>
                    Hi, I'm
                </Typography>
                <Typography style={{ fontFamily: 'Source Code Pro', fontWeight: 200, fontSize: 150, color: 'white', lineHeight: 1 }}>
                    Caden
                    <br />Juang
                </Typography>
            </Box>
        </Html >
    } else {
        return <Html fullscreen>
            <Box sx={{ mt: 10, ml: 5 }}>
                <Typography style={{ fontFamily: 'Source Code Pro', fontSize: 20, color: 'white' }}>
                    Hi, I'm
                </Typography>
                <Typography style={{ fontFamily: 'Source Code Pro', fontWeight: 200, fontSize: 150, color: 'white', lineHeight: 1 }}>
                    Caden
                    <br />Juang
                </Typography>
            </Box>
            <Box sx={{ position: 'absolute', right: '0px', mr: 15 }}>
                <Typography style={{ fontFamily: 'Source Code Pro', fontWeight: 200, fontSize: 20, color: 'white' }}>
                    Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit,<br /> sed do eiusmod tempor incid<br /> labore et dolore magna alia.
                </Typography>
            </Box>
        </Html >
    }
};


const Milky = ({ handleDoubleClick, handleReached, updateState}) => {
    const gltf = useLoader(GLTFLoader, "./need_some_space/scene.gltf");

    const ref = useRef();
    const [active, setActive] = useState(false);

    const targetPosition = new Vector3(0, 2, 20);

    useFrame((state) => {
        ref.current.rotation.y += 0.004
        console.log(state.camera.position.z);
        if (state.camera.position.z < targetPosition.getComponent(2) && reached==false) {
            reached = true;
            handleReached();
        }
        if (active && state.camera.position.z > targetPosition.getComponent(2)) {
            state.camera.position.lerp(dummy.set(0, 2, 19.5), 0.2);
        }
    })

    return <mesh
        ref={ref}
        onWheel={() => {
            if (!reached) setActive(!active);
        }}
        onDoubleClick={handleDoubleClick}
        
        onUpdate={() => {
            if (!hasRendered) {
                hasRendered = true;
                updateState()
            }
        }}
    >
        <primitive object={gltf.scene} position={[-2140, -2140, 2130]} scale={1500} />
    </mesh>;
};

const Ship = () => {

    const fbx = useLoader(FBXLoader, "./X-Wing.fbx");

    return (
        <mesh
            position={[0, 2, 15]}
            rotation={[0, Math.PI, 0]}
        >
            <primitive object={fbx} scale={0.001} />
        </mesh>
    );
};

const MouseTrackingShip = () => {

    const ref = useRef()

    useFrame(() => {
        if ((trackedX !== null && !isNaN(trackedX)) && (trackedY !== null && !isNaN(trackedY))) {
            const xFactor = width / 0.25;
            const yFactor = height / 0.15;
            const xHalf = width / 2;
            const yHalf = height / 2;
            let transformedX = (Math.abs(xHalf - trackedX) / xFactor) * ((trackedX < xHalf) ? -1 : 1);
            let transformedY = (Math.abs(yHalf - trackedY) / yFactor) * ((trackedY > yHalf) ? -1 : 1);
            transformedX /= 15;
            transformedY /= 15;
            x += (x < 0.35 && x > -0.35) ? transformedX : ((x >= 0) ? -0.0002 : 0.0002);
            y += (y < 0.15 && y > -0.15) ? transformedY : ((y >= 0) ? -0.0002 : 0.0002);
        } else {
            x += 0;
            x += 0;
        }

        ref.current.rotation.set(-y, x, 0)
    })

    return (
        <mesh ref={ref}>
            <Ship />
        </mesh>
    )
}


export default function Animation(props) {
    width = window.innerWidth;
    height = window.innerHeight;


    let navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [update, setUpdate] = useState(false);

    function handleDoubleClick() {
        navigate('./home');
    }
    function handleReached() {
        setActive(!active);
    }
    function updateState() {
        setUpdate(!update)
        console.log("updated!")
    }

    return (
        <div onMouseMove={(event) => {
            trackedX = event.clientX;
            trackedY = event.clientY;
        }}>

            <Box height="100vh" {...props} position="relative">
                <Canvas camera={{ fov: 70, position: [0, 2, 100] }}>
                    <directionalLight position={[10, 10, 5]} intensity={2} />
                    <directionalLight position={[-10, -10, -5]} intensity={1} />
                    <Suspense>
                        <Text active={active}/>
                        <Milky handleDoubleClick={handleDoubleClick} handleReached={handleReached} updateState={updateState}/>
                        <MiningStation/>
                        <BlackBox />
                        <MouseTrackingShip />
                    </Suspense>
                </Canvas>
                <Loader />
            </Box>

        </div>
    )
}
