import { Dimensions } from 'react-native';
import moment from 'moment';

const { height: deviceHeight } = Dimensions.get('window');

export const ResponsiveSize = (size) => {
  if (deviceHeight <= 568) {
    return size;
  } else if (deviceHeight <= 667) {
    return size * 1.17;
  } else if (deviceHeight <= 736) {
    return size * 1.29;
  } else if (deviceHeight <= 1024) {
    return size * 1.5;
  }
};

export const timeFormater = (prev, current) => {
  const [accH, accM, accS] = prev;
  const [h, min, sec] = current;
  let H = accH + h,
    M = accM + min,
    S = accS + sec;
  if (S === 60) {
    S = 0;
    M++;
  } else if (S > 60) {
    M++;
    S -= 60;
  }
  if (M === 60) {
    M = 0;
    H++;
  } else if (M > 60) {
    H++;
    M -= 60;
  }
  return [H, M, S];
};

export const addToObject = (prev, name) => {
  if (prev[name]) {
    return {
      ...prev,
      [name]: prev[name] + 1,
    };
  }
  return {
    ...prev,
    [name]: 1,
  };
};

export const dateParser = (date) => {
  return moment(date).utc(false).toISOString();
};
