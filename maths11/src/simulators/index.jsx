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

import { Locus } from './ch05_lines/Locus';
import { SlopeBuilder } from './ch05_lines/SlopeBuilder';
import { LineForms } from './ch05_lines/LineForms';
import { LineAngles } from './ch05_lines/LineAngles';
import { FamilyOfLines } from './ch05_lines/FamilyOfLines';

import { EquationBuilder as CircleEquation } from './ch06_circle/EquationBuilder';
import { TangentNormal as CircleTangent } from './ch06_circle/TangentNormal';
import { TangentCondition as CircleCondition } from './ch06_circle/TangentCondition';
import { ParametricEquations as CircleParametric } from './ch06_circle/ParametricEquations';
import { PointPosition as CirclePosition } from './ch06_circle/PointPosition';

import { ConicTypes } from './ch07_conics/ConicTypes';
import { ParabolaSim } from './ch07_conics/ParabolaSim';
import { EllipseSim } from './ch07_conics/EllipseSim';
import { HyperbolaSim } from './ch07_conics/HyperbolaSim';
import { FocusEquations } from './ch07_conics/FocusEquations';

import { RangeSim } from './ch08_dispersion/RangeSim';
import { VarianceSim } from './ch08_dispersion/VarianceSim';
import { StdDevSim } from './ch08_dispersion/StdDevSim';
import { CoefficientVar } from './ch08_dispersion/CoefficientVar';

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

  // Chapter 5: Straight Lines
  '5-0': Locus,
  '5-1': SlopeBuilder,
  '5-2': LineForms,
  '5-3': LineAngles,
  '5-4': FamilyOfLines,

  // Chapter 6: Circle
  '6-0': CircleEquation,
  '6-1': CircleTangent,
  '6-2': CircleCondition,
  '6-3': CircleParametric,
  '6-4': CirclePosition,

  // Chapter 7: Conic Sections
  '7-0': ConicTypes,
  '7-1': ParabolaSim,
  '7-2': EllipseSim,
  '7-3': HyperbolaSim,
  '7-4': FocusEquations,

  // Chapter 8: Measures of Dispersion
  '8-0': RangeSim,
  '8-1': VarianceSim,
  '8-2': StdDevSim,
  '8-3': CoefficientVar,
  
  // Future chapters will be mapped here
};
