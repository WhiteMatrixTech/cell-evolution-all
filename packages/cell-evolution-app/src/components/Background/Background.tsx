/* eslint-disable no-param-reassign */
import cn from 'classnames';
import { Power0, TweenMax } from 'gsap';
import { useEffect } from 'react';
import { useRef } from 'react';
import * as THREE from 'three';
import debounce from 'lodash/debounce';
import Parallax from 'parallax-js';

import styles from './Background.less';

interface BackgroundProps {
  className?: string;
}

// colors
const colors = [new THREE.Color(0xac1122), new THREE.Color(0x96789f), new THREE.Color(0x535353)];

/**
 * 背景球
 * @param props
 * @returns
 */
export function Background(props: BackgroundProps) {
  const { className } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let renderCanvas: (() => void) | undefined;
    let resizeCanvas: (() => void) | undefined;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      const renderer = createRenderer(canvas, width, height);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
      camera.position.set(0, 0, 350);

      // init and get points data
      const {
        dotsGeometry,
        colorIndexes,
      }: { dotsGeometry: THREE.Geometry; colorIndexes: number[] } = initDots();

      // create and get lines segment
      const segmentsGeom = new THREE.Geometry();
      const segment = initLines(dotsGeometry, segmentsGeom, colorIndexes);
      scene.add(segment);

      renderCanvas = () => {
        segmentsGeom.verticesNeedUpdate = true;
        renderer.render(scene, camera);
      };

      TweenMax.ticker.addEventListener('tick', renderCanvas);
      resizeCanvas = debounce(() => resizeCameraAndRender(canvas, camera, renderer), 200);
      window.addEventListener('resize', resizeCanvas);
    }
    return () => {
      if (renderCanvas) TweenMax.ticker.removeEventListener('tick', renderCanvas);
      if (resizeCanvas) window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const sceneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (sceneRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const parallaxInstance = new Parallax(sceneRef.current, {
        relativeInput: true,
      });
    }

    return () => {};
  }, []);
  return (
    <div className={cn(styles.Background, className)} ref={sceneRef}>
      <div data-depth="0.2">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
function createRenderer(canvas: HTMLCanvasElement, width: number, height: number) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000);
  return renderer;
}

function initDots() {
  const dotsAmount = 3000;
  const dotsGeometry = new THREE.Geometry();

  const colorIndexes: number[] = [];
  for (let i = 0; i < dotsAmount; i += 1) {
    const vector = new THREE.Vector3();

    const colorIndex = Math.floor(Math.random() * colors.length);
    const theta = Math.random() * Math.PI * 2;
    const phi = (((1 - Math.sqrt(Math.random())) * Math.PI) / 2) * (Math.random() > 0.5 ? 1 : -1);

    vector.x = Math.cos(theta) * Math.cos(phi);
    vector.y = Math.sin(phi);
    vector.z = Math.sin(theta) * Math.cos(phi);
    vector.multiplyScalar(120 + (Math.random() - 0.5) * 5);

    if (Math.random() > 0.5) {
      (function move(v: THREE.Vector3) {
        const tempVector = v.clone();
        tempVector.multiplyScalar((Math.random() - 0.5) * 0.2 + 1);
        TweenMax.to(v, Math.random() * 3 + 3, {
          x: tempVector.x,
          y: tempVector.y,
          z: tempVector.z,
          yoyo: true,
          repeat: -1,
          delay: -Math.random() * 3,
          ease: Power0.easeNone,
        });
      })(vector);
    }
    dotsGeometry.vertices.push(vector);
    colorIndexes.push(colorIndex);
  }
  return { dotsGeometry, colorIndexes };
}

function resizeCameraAndRender(
  canvas: HTMLCanvasElement,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
) {
  canvas.style.width = '';
  canvas.style.height = '';
  const rWidth = canvas.offsetWidth;
  const rHeight = canvas.offsetHeight;
  camera.aspect = rWidth / rHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(rWidth, rHeight);
}

function initLines(
  dotsGeometry: THREE.Geometry,
  segmentsGeom: THREE.Geometry,
  colorIndexes: number[],
) {
  const segmentsMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
    vertexColors: THREE.VertexColors,
  });
  for (let i = dotsGeometry.vertices.length - 1; i >= 0; i -= 1) {
    const vector = dotsGeometry.vertices[i];
    for (let j = dotsGeometry.vertices.length - 1; j >= 0; j -= 1) {
      if (i !== j && vector.distanceTo(dotsGeometry.vertices[j]) < 12) {
        segmentsGeom.vertices.push(vector);
        segmentsGeom.vertices.push(dotsGeometry.vertices[j]);
        segmentsGeom.colors.push(colors[colorIndexes[i]]);
        segmentsGeom.colors.push(colors[colorIndexes[i]]);
      }
    }
  }
  return new THREE.LineSegments(segmentsGeom, segmentsMat);
}
