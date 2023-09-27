import * as tf from '@tensorflow/tfjs';

export default async function preprocessImage(
  image: HTMLImageElement
): Promise<tf.Tensor3D | tf.Tensor<tf.Rank>> {
  return tf.tidy(() => {
    const tensor = tf.browser.fromPixels(image);
    const resized = tf.image.resizeBilinear(tensor, [224, 224]); // Resizing the image to the required input dimensions of our model
    const normalized = resized.div(255); // Normalize pixel values between 0 and 1
    const expanded = normalized.expandDims(); // Add an extra dimension to represent the batch size

    return expanded;
  });
}