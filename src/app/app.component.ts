import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';

// https://github.com/zxing-js/ngx-scanner/wiki/Advanced-Usage
// https://github.com/zxing-js/ngx-scanner/blob/master/projects/zxing-scanner-demo/src/app/app.component.html
// https://dribbble.com/shots/4363843-Bar-QR-code-Scanner

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public torchEnabled: boolean = false;
  public deviceCurrent?: MediaDeviceInfo;
  public deviceSelected?: string;
  public qrResultString?: string;
  public tryHarder: boolean = false;
  public hasPermission: boolean = false;
  public availableDevices: MediaDeviceInfo[] = [];
  public hasDevices: boolean = false;
  public readonly torchAvailable$ = new BehaviorSubject<boolean>(false);

  public readonly formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.UPC_EAN_EXTENSION,
    BarcodeFormat.ITF,
  ];

  constructor() {}

  ngOnInit(): void {}

  public onDeviceChange(device: MediaDeviceInfo) {
    console.log('onDeviceChange:', device);

    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }

    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  public onCodeResult(resultString: string) {
    console.log('onCodeResult:', resultString);
    this.qrResultString = resultString;
  }

  public onHasPermission(has: boolean) {
    console.log('onHasPermission:', has);
    this.hasPermission = has;
  }

  public onCamerasFound(devices: MediaDeviceInfo[]): void {
    console.log('onCamerasFound:', devices);

    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  public onTorchCompatible(isCompatible: boolean): void {
    console.log('onTorchCompatible:', isCompatible);

    this.torchAvailable$.next(isCompatible || false);
  }

  public onDeviceSelectChange(selected: string) {
    debugger;
    console.log('onDeviceSelectChange:', selected);

    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }
}
