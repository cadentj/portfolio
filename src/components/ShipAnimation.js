import ReactDOM from 'react-dom'
import { Box, Typography } from '@mui/material';
import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CubeTextureLoader, Vector3 } from "three";
import { Html, OrbitControls } from '@react-three/drei';
import useMouse from '@react-hook/mouse-position'


function SkyBox() {
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

const Planets = () => {
    const gltf = useLoader(GLTFLoader, "./station/scene.gltf");

    const ref = useRef();
    useFrame((state) => (ref.current.rotation.y += 0.01));


    const planetMesh = <mesh
        ref={ref}
        position={[10,-2,15]}
    >
        <primitive object={gltf.scene} position={[-1,0,4.65]} scale={0.1} />
    </mesh>;




    return planetMesh;
};

const dummy = new Vector3()

const Milky = () => {
    const gltf = useLoader(GLTFLoader, "./need_some_space/scene.gltf");

    const ref = useRef();
    const [active, setActive] = useState(false);



    useFrame((state) => {
        ref.current.rotation.y += 0.004

        if (active) {
            state.camera.position.lerp(dummy.set(0, 2, 20), 0.1)
        }
    })

    return <mesh
        ref={ref}
        onClick={() => setActive(!active)}
    >
        <primitive object={gltf.scene} position={[-2140, -2140, 2130]} scale={1500} />
    </mesh>;
};

const Ship = () => {

    const ref = useRef()


    const fbx = useLoader(FBXLoader, "./X-Wing.fbx");


    //Old Camera following behind jet
    // useFrame((state) => {
    //ref.current.position.z -= 0.013;

    //state.camera.position.lerp(dummy.set(0, 0, 0), 0.001)
    // })

    return (
        <mesh
            ref={ref}
            position={[0, 2, 15]}
            rotation={[0, Math.PI, 0]}
        >
            <primitive object={fbx} scale={0.001} />
        </mesh>
    );
};

let x = 0;
let y = 0;

const MouseTrackingShip = () => {

    const { viewport } = useThree()
    const ref = useRef()

    useFrame((state) => {

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

        // Besides testing, how am I supposed to know which positional argument is position vs point?
        ref.current.rotation.set(-y, x, 0)
    })

    return (
        <mesh ref={ref}>
            <Ship />
        </mesh>
    )
}

function HtmlContent({ className, style, children, portal }) {
    const { size } = useThree();
    return (
        <Html
            portal={portal}
            style={{
                position: 'absolute',
                // top: -size.height / 2,
                // left: -size.width / 2,
                // width: size.width,
                // height: size.height  
            }}>
            <div className={className} style={style}>
                {children}
            </div>
        </Html>
    )
}

const TestPortal = (props) => {
    return ReactDOM.createPortal(
        <>
            {props.children}
        </>
    );
}

let trackedX;
let trackedY;
let width;
let height;

export default function Animation(props) {
    const domContent = useRef();
    const ref = React.useRef(null);
    const mouse = useMouse(ref);

    trackedX = mouse.x;
    trackedY = mouse.y;
    width = mouse.elementWidth;
    height = mouse.elementHeight;


    return (
        <>

            <Box height="100vh" {...props} position="relative" ref={ref} >
                <Canvas camera={{ fov: 70, position: [0, 2, 100] }}>
                    <directionalLight position={[10, 10, 5]} intensity={2} />
                    <directionalLight position={[-10, -10, -5]} intensity={1} />
                    <Suspense>
                        <Html fullscreen>
                            <Box sx={{ mt: 2, ml: 2 }}>
                                <Typography style={{ fontFamily: 'Source Code Pro', fontSize: 20, color: 'white' }}>
                                    Hi, I'm
                                </Typography>
                                <Typography style={{ fontFamily: 'Source Code Pro', fontSize: 250, color: 'white', lineHeight: 1 }}>
                                    Caden
                                    <br />Juang
                                </Typography>
                            </Box>
                        </Html>
                        <Milky />
                        <Planets />
                        <SkyBox />
                        <MouseTrackingShip />
                    </Suspense>
                </Canvas>
            </Box>


        </>
    )
}
