export const defaultConfig = {
  // API key
  apiKey: 'CAP-31B5C24C3C8E19C78D333CA2D0DCB4CB',

  // Your Developer appId, Apply in dashboard's developer section
  appId: 'DC601421-43D5-45E4-9FDB-B3BAF7A2C3FD',

  // Is the extension enabled by default or not
  useCapsolver: true,

  // Solve captcha manually
  manualSolving: false,

  // Captcha solved callback function name
  solvedCallback: 'captchaSolvedCallback',

  // Use proxy or not
  // If useProxy is true, then proxyType, hostOrIp, port, proxyLogin, proxyPassword are required
  useProxy: false,
  proxyType: 'http',
  hostOrIp: '',
  port: '',
  proxyLogin: '',
  proxyPassword: '',

  enabledForBlacklistControl: false, // Use blacklist control
  blackUrlList: [], // Blacklist URL list

  // Is captcha enabled by default or not
  enabledForRecaptcha: true,
  enabledForRecaptchaV3: true,
  enabledForHCaptcha: true,
  enabledForImageToText: true,
  enabledForAwsCaptcha: true,

  // Task type: click or token
  reCaptchaMode: 'click',
  hCaptchaMode: 'click',

  // Delay before solving captcha
  reCaptchaDelayTime: 0,
  hCaptchaDelayTime: 0,
  textCaptchaDelayTime: 0,
  awsDelayTime: 0,

  // Number of repeated solutions after an error
  reCaptchaRepeatTimes: 10,
  reCaptcha3RepeatTimes: 10,
  hCaptchaRepeatTimes: 10,
  funCaptchaRepeatTimes: 10,
  textCaptchaRepeatTimes: 10,
  awsRepeatTimes: 10,

  // ReCaptcha V3 task type: ReCaptchaV3TaskProxyLess or ReCaptchaV3M1TaskProxyLess
  reCaptcha3TaskType: 'ReCaptchaV3TaskProxyLess',

  textCaptchaSourceAttribute: 'capsolver-image-to-text-source', // ImageToText source img's attribute name
  textCaptchaResultAttribute: 'capsolver-image-to-text-result', // ImageToText result element's attribute name

  textCaptchaModule: 'common', // ImageToText module
};
