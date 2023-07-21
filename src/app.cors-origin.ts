export const CORS_ORIGIN: (string | RegExp)[] = [
  /^http?:\/\/localhost:3[\d]+$/i,
  /^https?:\/\/localhost\/.*$/i,
  /^https?:\/\/127\.0\.0\.1:5[\d]+$/i,
  /^https?:\/\/127\.0\.0\.1:3[\d]+$/i,
  /^https?:\/\/([^\.]*\.|www\.[a-z]*\.)?julianestebanrh\.(bz|uy|sv|es|cl|cr|com)$/i,
];
