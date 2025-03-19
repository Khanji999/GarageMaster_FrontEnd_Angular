import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ImageService } from '../../../core/services/dealingWithImage/image.service';

@Component({
  selector: 'app-camera',
  imports: [WebcamModule, CommonModule],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true, // Ensure this is set if using standalone components
})
export class CameraComponent {
  status: string | null = null;
  stream: MediaStream | undefined;
  trigger: Subject<void> = new Subject();
  previewImage: string | undefined;
  videoOptions: MediaTrackConstraints = {
    width: { ideal: 500 }, // Set a higher resolution
    height: { ideal: 500 }, // Set a higher resolution
    facingMode: 'environment', // Use the back camera by default
  };
  image?: File;
  cameraPopupVisible = false; // Flag to control the popup visibility

  constructor(private imageService: ImageService) {}

  // Observable for triggering image capture
  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  // Start the camera stream and check permissions
  checkPermission(): void {
    navigator.mediaDevices
      .getUserMedia({ video: this.videoOptions })
      .then((stream: MediaStream) => {
        this.stream = stream;
        this.status = 'Camera is running now';
      })
      .catch((err) => {
        console.error(err);
        if (err?.message === 'Permission denied') {
          this.status = 'Permission denied. Please enable camera access.';
        } else {
          this.status = 'Error accessing camera.';
        }
      });
  }

  // Open the camera popup
  openCameraPopup(): void {
    this.cameraPopupVisible = true;
    this.checkPermission(); // Start camera when popup opens
  }

  // Close the camera popup and stop the stream
  closeCameraPopup(): void {
    this.cameraPopupVisible = false;
    this.stopCameraStream(); // Stop the camera stream
    this.reset(); // Reset the captured image when closing
  }

  // Stop the camera stream
  stopCameraStream(): void {
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  }

  // Capture image from webcam stream
  snapshot(event: WebcamImage): void {
    this.previewImage = event.imageAsDataUrl;

    // Convert base64 data URL to File
    const dataUrl = event.imageAsDataUrl;
    const byteString = atob(dataUrl.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    // Create a Blob from the array buffer
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });

    // Create a File object from the Blob
    this.image = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
  }

  // Trigger image capture
  captureImage(): void {
    this.trigger.next();
  }

  // Reset the captured image
  reset(): void {
    this.previewImage = '';
    this.image = undefined;
  }

  // Save the captured image and keep the camera open
  save(): void {
    if (this.image) {
      // Ensure the image is a valid File object
      this.imageService.uploadImage(this.image).subscribe({
        next: () => {
          // Handle successful upload (e.g., show a success message)
          console.log('Image uploaded successfully');
          this.reset(); // Reset to capture another image
        },
        error: (err) => {
          // Handle error (e.g., show an error message)
          console.error('Image upload failed', err);
        },
        complete: () => {
          // Keep the camera open and ready to capture another image
        },
      });
    } else {
      console.log('No image to upload');
    }
  }
}
