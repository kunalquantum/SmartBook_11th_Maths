// Export generic simulators if any
export const Simulators = {};

// Export topic-specific simulators
import { DirectedAngles } from './ch01_angles/DirectedAngles';
import { AngleMeasurement } from './ch01_angles/AngleMeasurement';
import { ArcSector } from './ch01_angles/ArcSector';
import { UnitCircle } from './ch02_trig1/UnitCircle';
import { ParticularAngles } from './ch02_trig1/ParticularAngles';
import { TrigIdentities } from './ch02_trig1/TrigIdentities';
import { SumDifference } from './ch03_trig2/SumDifference';
import { DoubleAngle } from './ch03_trig2/DoubleAngle';
import { Factorization } from './ch03_trig2/Factorization';

import { DeterminantExpander } from './ch04_matrices/DeterminantExpander';
import { DeterminantProperties } from './ch04_matrices/DeterminantProperties';
import { CramersRule } from './ch04_matrices/CramersRule';
import { MatrixTypes } from './ch04_matrices/MatrixTypes';
import { MatrixAlgebra } from './ch04_matrices/MatrixAlgebra';

export const TopicSimulators = {
  // Chapter 1: Angle and its Measurement
  '1-0': DirectedAngles,
  '1-1': AngleMeasurement,
  '1-2': AngleMeasurement, // Reusing component for degree/radian convert
  '1-3': ArcSector,

  // Chapter 2: Trigonometry - 1
  '2-0': UnitCircle,
  '2-1': ParticularAngles,
  '2-2': TrigIdentities,

  // Chapter 3: Trigonometry - 2
  '3-0': SumDifference,
  '3-1': DoubleAngle,
  '3-2': Factorization,

  // Chapter 4: Determinants and Matrices
  '4-0': DeterminantExpander,
  '4-1': DeterminantProperties,
  '4-2': CramersRule,
  '4-3': MatrixTypes,
  '4-4': MatrixAlgebra,
  
  // Future chapters will be mapped here
};
