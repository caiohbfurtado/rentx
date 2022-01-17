import SpeedIcon from '../assets/speed.svg';
import CarIcon from '../assets/car.svg';
import AccelerationIcon from '../assets/acceleration.svg';
import ForceIcon from '../assets/force.svg';
import GasolineIcon from '../assets/gasoline.svg';
import ExchangeIcon from '../assets/exchange.svg';
import PeopleIcon from '../assets/people.svg';
import ElectricIcon from '../assets/energy.svg';
import HybridIcon from '../assets/hybrid.svg';
import { SvgProps } from 'react-native-svg';

const iconList = {
  speed: SpeedIcon,
  acceleration: AccelerationIcon,
  turning_diameter: ForceIcon,
  electric_motor: ElectricIcon,
  gasoline_motor: GasolineIcon,
  exchange: ExchangeIcon,
  seats: PeopleIcon,
  hybrid_motor: HybridIcon,
}

export function getAccessoryIcon(type: string): React.FC<SvgProps> {
  return iconList[type] ?? CarIcon;
}