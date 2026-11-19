// Only the parts of three.js the scenes use. Importing this module instead of
// "three" lets the bundler drop the rest of the library from the lazy chunk.
export { AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, CustomBlending, DoubleSide, Float32BufferAttribute, Group, InstancedBufferAttribute, InstancedMesh, LatheGeometry, Matrix4, Mesh, OneFactor, OneMinusSrcAlphaFactor, PerspectiveCamera, Quaternion, Scene, ShaderMaterial, Shape, ShapeGeometry, Sprite, SpriteMaterial, Vector2, Vector3, Vector4, WebGLRenderer } from "three";
