import React from 'react'
import { useRef } from 'react'
import { Canvas, useLoader  } from '@react-three/fiber'
import { OrbitControls, PivotControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Physics, usePointToPointConstraint, Debug } from '@react-three/cannon'

function Model(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  const gltf = useLoader(GLTFLoader, 'src/assets/3dmodel/scene.gltf')
  const body = useRef()
  const joint1 = useRef()
  
  return (
      <mesh
        {...props}
        ref={ref}
        receiveShadow
        castShadow
        scale={0.02}>
        <group >
          <primitive object={gltf.scene} />
        </group>
        <PivotControls scale={40}>
          <group ref={body} rotation-x={Math.PI / -2}>
            <mesh>
              <primitive object={gltf.scene.getObjectByName('Top_plate_i_kukovi_v21')}/>
              <primitive object={gltf.scene.getObjectByName('standoff_m2-31_v11')}/>
              <primitive object={gltf.scene.getObjectByName('standoff_m2-31_v12')}/>
              <primitive object={gltf.scene.getObjectByName('standoff_m2-31_v13')}/>
              <primitive object={gltf.scene.getObjectByName('standoff_m2-31_v14')}/>
              <primitive object={gltf.scene.getObjectByName('92005A0231')}/>
              <primitive object={gltf.scene.getObjectByName('92005A023(Mirror)(Mirror)1')}/>
              <primitive object={gltf.scene.getObjectByName('92005A023(Mirror)(Mirror)(Mirror)1')}/>
              <primitive object={gltf.scene.getObjectByName('92005A023(Mirror)(Mirror)_(1)1')}/>
              <primitive object={gltf.scene.getObjectByName('92005A1201')}/>
              <primitive object={gltf.scene.getObjectByName('94997A125_(1)1')}/>
              <primitive object={gltf.scene.getObjectByName('92005A120(Mirror)1')}/>
              <primitive object={gltf.scene.getObjectByName('92005A120(Mirror)2')}/>
              <primitive object={gltf.scene.getObjectByName('92005A120(Mirror)(Mirror)1')}/>
              <primitive object={gltf.scene.getObjectByName('92005A120(Mirror)(Mirror)(Mirror)1')}/>
              <primitive object={gltf.scene.getObjectByName('92005A120(Mirror)(Mirror)_(1)1')}/>
              <primitive object={gltf.scene.getObjectByName('94997A125_(1)(Mirror)1')}/>
              <primitive object={gltf.scene.getObjectByName('94997A125_(1)2')}/>
              <primitive object={gltf.scene.getObjectByName('94997A125_(1)(Mirror)_(1)1')}/>
              <primitive object={gltf.scene.getObjectByName('94997A125_(1)3')}/>
              <primitive object={gltf.scene.getObjectByName('94997A125_(1)(Mirror)_(2)1')}/>
              <primitive object={gltf.scene.getObjectByName('bottom_za_rezanje_fin_v81')}/>
              <primitive object={gltf.scene.getObjectByName('PCB_v21')}/>
              <primitive object={gltf.scene.getObjectByName('92005A023(Mirror)1')}/>
              <primitive object={gltf.scene.getObjectByName('Body86')}/>
              <primitive object={gltf.scene.getObjectByName('Body87')}/>
              <primitive object={gltf.scene.getObjectByName('Body88')}/>
            </mesh>
          </group>
        </PivotControls>
        <group rotation-x={Math.PI / -2}>
          <primitive ref={joint1} object={gltf.scene.getObjectByName('Bone_link_v3(Mirror)1')} />
        </group>
      </mesh>
  )
}


const tdm = () => {
  return (
    <div className='bg-primary rounded-md tdmodel'>
      <Canvas shadows className='h-full w-full' camera={{ fov: 60, position: [4, 3, 7] }}>
        <ambientLight intensity={2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Physics>
          <Model></Model>
        </Physics>
        <OrbitControls/>
      </Canvas>
    </div>
  )
}

export default tdm