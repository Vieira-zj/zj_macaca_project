/**
 * blink-diff:
 * https://www.npmjs.com/package/blink-diff
 * 
 * threshold: Number of pixels/percent p below which differences are ignored 
 * (default: 500) - For percentage thresholds: 1 = 100%, 0.2 = 20%
 * 
 * thresholdType: Type of threshold check. 
 * This can be BlinkDiff.THRESHOLD_PIXEL and BlinkDiff.THRESHOLD_PERCENT 
 * (default: BlinkDiff.THRESHOLD_PIXEL)
 */
'use strict';

const BlinkDiff = require('blink-diff');

function diffImage(imageAPath, imageB, threshold, outputPath) {
  return new Promise((resolve, reject) => {
    var diff = new BlinkDiff({
      imageAPath: imageAPath, // Path
      imageB: imageB, // Buffer
      thresholdType: BlinkDiff.THRESHOLD_PERCENT,
      threshold: threshold,
      imageOutputPath: outputPath
    });

    diff.run((err, result) => {
      if (err) {
        return reject(err);
      }
      var ifPassed = diff.hasPassed(result.code);
      console.log(ifPassed ? 'Image Comparison Passed' : 'Image Comparison Failed');
      console.log(`Found ${result.differences} pixel differences between two images.`);
      resolve(ifPassed);
    });
  });
}

function diffImageByPath(imageAPath, imageBPath, threshold, outputPath) {
  const thresholdType = threshold > 1 ? BlinkDiff.THRESHOLD_PIXEL : BlinkDiff.THRESHOLD_PERCENT

  return new Promise((resolve, reject) => {
    var diff = new BlinkDiff({
      imageAPath: imageAPath,
      imageBPath: imageBPath,
      thresholdType: thresholdType,
      threshold: threshold,
      imageOutputPath: outputPath
    });
  
    diff.run((err, result) => {
      if (err) {
        console.error(err);
        return reject(false);
      }
      var ifPassed = diff.hasPassed(result.code);
      console.log(ifPassed ? 'Image Comparison Passed' : 'Image Comparison Failed');
      console.log(`Found ${result.differences} pixel differences between two images.`);
      resolve(ifPassed);
    });
  });
}

module.exports = {
  diffImage,
  diffImageByPath
};
