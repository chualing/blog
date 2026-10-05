'use client'

import { useEffect, useRef, useState } from 'react'
import type { Material, Object3D } from 'three'

interface ModelViewerProps {
  src: string
  alt?: string
  className?: string
  autoRotate?: boolean
}

type LoadStatus = 'loading' | 'ready' | 'error'

/** 递归释放材质上的纹理与几何体资源，规避内存泄漏 */
function disposeObject(obj: Object3D): void {
  obj.traverse((child) => {
    const mesh = child as Object3D & { geometry?: { dispose?: () => void } }
    if (mesh.geometry?.dispose) {
      mesh.geometry.dispose()
    }
    const material = (child as Object3D & { material?: Material | Material[] }).material
    if (material) {
      const materials = Array.isArray(material) ? material : [material]
      materials.forEach((mat) => disposeMaterial(mat))
    }
  })
}

function disposeMaterial(mat: Material): void {
  const anyMat = mat as Material & {
    map?: { dispose?: () => void }
    normalMap?: { dispose?: () => void }
    roughnessMap?: { dispose?: () => void }
    metalnessMap?: { dispose?: () => void }
  }
  anyMat.map?.dispose?.()
  anyMat.normalMap?.dispose?.()
  anyMat.roughnessMap?.dispose?.()
  anyMat.metalnessMap?.dispose?.()
  mat.dispose()
}

/**
 * 3D 模型展示组件（客户端）。
 * - three 及其加载器通过动态 import 按需加载，不进入首屏主包。
 * - 内置加载状态与错误兜底。
 * - 卸载时取消渲染循环并释放 renderer / scene 资源，防止内存泄漏。
 */
export default function ModelViewer({ src, alt, autoRotate = true, className }: ModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<LoadStatus>('loading')

  useEffect(() => {
    const mountEl = mountRef.current
    if (!mountEl) return

    let cancelled = false
    let frameId = 0
    // 仅声明类型的清理函数引用，便于 dispose 阶段重复执行
    let cleanup: (() => void) | null = null

    async function init(mount: HTMLDivElement): Promise<void> {
      try {
        const THREE = await import('three')
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')

        const scene = new THREE.Scene()
        const width = mount.clientWidth || 480
        const height = mount.clientHeight || 320
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
        camera.position.set(3, 2.5, 5)

        const r = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        r.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        r.setSize(width, height)
        mount.appendChild(r.domElement)

        scene.add(new THREE.AmbientLight(0xffffff, 0.7))
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
        dirLight.position.set(5, 10, 7)
        scene.add(dirLight)

        const controls = new OrbitControls(camera, r.domElement)
        controls.enableDamping = true

        const loader = new GLTFLoader()
        const gltf = await loader.loadAsync(src)
        const model = gltf.scene
        scene.add(model)
        if (cancelled) {
          disposeObject(model)
          return
        }

        setStatus('ready')

        const animate = (): void => {
          frameId = requestAnimationFrame(animate)
          if (autoRotate) model.rotation.y += 0.005
          controls.update()
          r.render(scene, camera)
        }
        animate()

        cleanup = (): void => {
          if (frameId) cancelAnimationFrame(frameId)
          controls.dispose()
          disposeObject(scene)
          scene.clear()
          r.dispose()
          if (r.domElement.parentNode) {
            r.domElement.parentNode.removeChild(r.domElement)
          }
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    init(mountEl)

    return (): void => {
      cancelled = true
      if (frameId) cancelAnimationFrame(frameId)
      cleanup?.()
    }
  }, [src, autoRotate])

  return (
    <div className={className ?? 'my-4'}>
      <div ref={mountRef} className="h-80 w-full" role="img" aria-label={alt} />
      {status === 'loading' && (
        <p className="mt-2 text-sm text-slate-500">模型加载中…</p>
      )}
      {status === 'error' && (
        <p role="alert" className="mt-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          模型加载失败，请稍后重试。
        </p>
      )}
    </div>
  )
}