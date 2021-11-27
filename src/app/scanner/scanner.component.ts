import { Component, Inject } from '@angular/core';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { ImageService } from './scanner.image.service';
import { VideoService } from './scanner.video.service';

class FileSnippet {
  pending: boolean = false;
  status: string = 'init';
  percent: string = '0';
  constructor(@Inject('src') public src: string, @Inject('file') public file: File) {}

}

@Component({
  selector: 'scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css'],
  providers: [ImageService, VideoService]
})
export class ScannerComponent {

  selectedFile: FileSnippet;
  showResult: boolean = false;
  showResult2: boolean = false;

  constructor(private imageService: ImageService, private videoService: VideoService){}

  private onSuccess(val: string) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.selectedFile.percent = val;
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {

    const file: File = imageInput.files[0];
    if(file){
      this.showResult = true;
    }else{
      alert("Image not uploaded. Try again!");
    }

    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new FileSnippet(event.target.result, file);
      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          let result = parseFloat(res[0].dict.prob);
          this.onSuccess(result.toFixed(3));
        },
        (err) => {
          this.onError();
          console.log(err);
        })
    });

    reader.readAsDataURL(file);
  }

  processFile2(videoInput: any) {
    const file: File = videoInput.files[0];
    if(file){
      this.showResult = true;
    }else{
      alert("Video not uploaded. Try again!");
    }

    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new FileSnippet(event.target.result, file);
      this.selectedFile.pending = true;
      this.videoService.uploadVideo(this.selectedFile.file).subscribe(
        (res) => {
          console.log(res);
          let result = parseFloat(res[0].dict.prob);
          this.onSuccess(result.toFixed(3));
        },
        (err) => {
          this.onError();
          console.log(err);
        })
    });

    reader.readAsDataURL(file);
  }

  resetFile() {
    this.showResult = false;
  }
}
