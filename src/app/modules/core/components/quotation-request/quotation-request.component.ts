import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quotation-request',
  templateUrl: './quotation-request.component.html',
  styleUrls: ['./quotation-request.component.scss'],
})
export class QuotationRequestComponent implements OnInit {
  qrCodeCheckValue: string;
  qrCodeCheckValue2: string;

  contactFormGroup = this._formBuilder.group({
    user_name: ['', [Validators.required, Validators.minLength(4)]],
    phone: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    email: ['', [Validators.required, Validators.email]],
  });

  earthInfoFormGroup = this._formBuilder.group({
    land_area: ['', Validators.required],
    number_of_streets: ['', Validators.required],
    height: ['', Validators.required],
    width: ['', Validators.required],
  });

  requestServiceFormGroup = this._formBuilder.group({
    service: ['', Validators.required],
    parCode: ['', [Validators.required, Validators.minLength(4)]],
  });

  serviceDetailsFormGroup = this._formBuilder.group({
    parCode: ['', [Validators.required, Validators.minLength(4)]],
    basement: [''],
    basementInfo: [''],
    Ground_floor: [''],
    Ground_floor_info: [''],
    roomNumbers: [''],
    toiltNumbers: [''],
    First_round: [''],
    First_round_if_Room_and_bathroom: [''],
    First_round_if_oneRoom: [''],
    First_round_info: [''],
    surface_extension: [''],
    surface_extension_info: [''],
    garden: [''],
    external_supplement: [''],
    parking: [''],
    parkingInfo: [''],
    Driver_room: [''],
    Driver_room_info: [''],
    more_info: [''],
  });

  isEditable = true;

  basementOptions = [
    { title: { ar: 'مسبح', en: 'swimming pool' }, value: 'swimming pool' },
    { title: { ar: ' مجلس', en: '  council' }, value: '  council' },
    { title: { ar: ' حديقة', en: '  garden' }, value: '  garden' },
    {
      title: { ar: ' غرفة غسيل', en: '  Laundry Room' },
      value: '  Laundry Room',
    },
    { title: { ar: ' مستودع', en: '  storehouse' }, value: '  storehouse' },
    {
      title: { ar: ' مواقف سيارات', en: '  Car parking' },
      value: '  Car parking',
    },
    { title: { ar: ' مكتب', en: '  office' }, value: '  office' },
    {
      title: { ar: ' مطبخ مفتوح', en: '  Open kitchen' },
      value: '  Open kitchen',
    },
    {
      title: { ar: ' مطبخ مغلق', en: '  Closed kitchen' },
      value: '  Closed kitchen',
    },
    {
      title: { ar: ' غرفة نوم فقط', en: '  bedroom only' },
      value: '  bedroom only',
    },
    {
      title: { ar: ' غرفة نوم + دورة مياه', en: '  Bedroom + bathroom' },
      value: '  Bedroom + bathroom',
    },
    { title: { ar: ' نادي صحي', en: '  Health club' }, value: '  Health club' },
    {
      title: { ar: ' صالة متعددة الإستخدامات', en: '  Multi-purpose hall' },
      value: '  Multi-purpose hall',
    },
    {
      title: { ar: ' غرفة ألعاب أطفال', en: '  Children playroom' },
      value: '  Children playroom',
    },
    {
      title: { ar: ' صالة سنيما منزلية', en: '  Home cinema hall' },
      value: '  Home cinema hall',
    },
  ];

  groundFloorOptions = [
    {
      title: { ar: 'معيشة عائلية', en: 'family living' },
      value: 'family living',
    },
    {
      title: { ar: ' غرفة طعام الضيوف', en: '  Guest dining room' },
      value: '  Guest dining room',
    },
    {
      title: { ar: ' مجلس الضيوف', en: '  Guest Council' },
      value: '  Guest Council',
    },
    {
      title: { ar: ' مطبخ مغلق', en: '  Closed kitchen' },
      value: '  Closed kitchen',
    },
    { title: { ar: ' مكتب', en: '  office' }, value: '  office' },
    {
      title: { ar: ' غرفة طعام العائلة', en: '  Family dining room' },
      value: '  Family dining room',
    },
    { title: { ar: ' مصعد ', en: '  elevator' }, value: '  elevator' },
    { title: { ar: 'مخزن', en: 'Store' }, value: 'Store' },
    {
      title: { ar: ' مطبخ مفتوح', en: '  Open kitchen' },
      value: '  Open kitchen',
    },
    {
      title: { ar: ' مدخل فرعي', en: '  Sub-entrance' },
      value: '  Sub-entrance',
    },
    {
      title: { ar: ' مدخل رئيسي', en: '  Main entrance' },
      value: '  Main entrance',
    },
    { title: { ar: ' دورات مياه', en: '  Bathrooms' }, value: '  Bathrooms' },
    {
      title: {
        ar: ' غرفة نوم إضافية + حمام ',
        en: '  Additional bedroom + bathroom',
      },
      value: '  Additional bedroom + bathroom',
    },
    { title: { ar: 'درج خدمة', en: 'service tray' }, value: 'service tray' },
    {
      title: { ar: ' درج رئيسي ', en: '  Master staircase' },
      value: '  Master staircase',
    },
    {
      title: { ar: 'غرفة غسيل الملابس و الكي', en: 'Laundry and ironing room' },
      value: 'Laundry and ironing room',
    },
    {
      title: { ar: ' غرفة خادمة + دورة مياه', en: '  Maid room + bathroom' },
      value: '  Maid room + bathroom',
    },
    {
      title: { ar: ' غرفة نوم إضافية فقط', en: '  Extra bedroom only' },
      value: '  Extra bedroom only',
    },
  ];

  firstFloorOptions = [
    {
      title: { ar: 'غرفة نوم فقط ', en: 'bedroom only' },
      value: 'bedroom only',
    },
    {
      title: { ar: 'غرفة نوم + دورة مياه', en: 'Bedroom + bathroom' },
      value: 'Bedroom + bathroom',
    },
    {
      title: { ar: ' جناح غرفة النوم الرئيسية', en: '  Master bedroom suite' },
      value: '  Master bedroom suite',
    },
    {
      title: {
        ar: ' مطبخ صغير و مفتوح للتخديم',
        en: '  Small kitchen open for serving',
      },
      value: '  Small kitchen open for serving',
    },
    {
      title: { ar: ' جلسة عائلية', en: '  Family session' },
      value: '  Family session',
    },
    {
      title: { ar: ' دورة مياه', en: '  W.C' },
      value: '  W.C',
    },
    {
      title: { ar: ' صالة رياضية', en: '  gym' },
      value: '  gym',
    },
    {
      title: { ar: ' غرفة خدمات', en: '  Service room' },
      value: '  Service room',
    },
    {
      title: { ar: ' مكتب', en: '  office' },
      value: '  office',
    },
  ];

  surfaceExtensionOptions = [
    {
      title: { ar: 'مستودع ', en: 'storehouse' },
      value: 'storehouse',
    },
    {
      title: { ar: ' دورة مياه ', en: '  toilet' },
      value: '  toilet',
    },
    {
      title: { ar: ' جلسة سطح ', en: '  rooftop session' },
      value: '  rooftop session',
    },
    {
      title: { ar: ' غرفة نوم للخادمه ', en: '  Maid bedroom' },
      value: '  Maid bedroom',
    },
    {
      title: {
        ar: ' غرفة غسيل الملابس و الكي ',
        en: '  Laundry and ironing room',
      },
      value: '  Laundry and ironing room',
    },
    {
      title: { ar: ' صالة متعددة الإستخدامات ', en: '  Multi-use hall' },
      value: '  Multi-use hall',
    },
  ];

  gardenOptions = [
    {
      title: { ar: 'مسطح مائي فقط', en: 'Flat water only' },
      value: 'Flat water only',
    },
    {
      title: {
        ar: ' درج خارجي للقبو',
        en: '  External staircase to the cellar',
      },
      value: '  External staircase to the cellar',
    },
    {
      title: { ar: ' منطقة للعب الأطفال', en: '  Kids play area' },
      value: '  Kids play area',
    },
    {
      title: { ar: ' جلسة خارجية', en: '  external session' },
      value: '  external session',
    },
    {
      title: { ar: ' مسبح', en: '  swimming pool' },
      value: '  swimming pool',
    },
  ];

  externalSupplementOptions = [
    {
      title: { ar: 'مجلس', en: 'council' },
      value: 'council',
    },
    {
      title: { ar: ' صالة متعددة الإستخدامات', en: '  Multi-use hall' },
      value: '  Multi-use hall',
    },
    {
      title: { ar: ' دورة مياه', en: '  toilet' },
      value: '  toilet',
    },
  ];

  ParkingOptions = [
    {
      title: { ar: 'سياره واحده ', en: 'one car' },
      value: 'one car',
    },
    {
      title: { ar: ' سيارتان ', en: '  two cars' },
      value: '  two cars',
    },
    {
      title: { ar: '  أكثر', en: '  more' },
      value: '  more',
    },
  ];

  driverRoomOptions = [
    {
      title: { ar: 'غرفة سائق + دورة مياه ', en: 'Driver room + bathroom' },
      value: 'Driver room + bathroom',
    },
    {
      title: {
        ar: ' غرفة سائقين مع دورات المياه ',
        en: '  Drivers room with toilets',
      },
      value: '  Drivers room with toilets',
    },
    {
      title: { ar: ' أكثر ', en: '  more' },
      value: '  more',
    },
  ];

  constructor(private _formBuilder: FormBuilder) {
    this.qrCodeCheckValue = Math.floor(1000 + Math.random() * 9000).toString();
    this.qrCodeCheckValue2 = Math.floor(1000 + Math.random() * 9000).toString();
  }

  ngOnInit(): void {}

  refreshQrCode(type?: any) {
    this.qrCodeCheckValue = Math.floor(1000 + Math.random() * 9000).toString();
    if (type) {
      this.qrCodeCheckValue2 = Math.floor(
        1000 + Math.random() * 9000
      ).toString();
    }
  }

  requestGeneralPrice() {
    // console.log(
    //   this.contactFormGroup.value,
    //   this.earthInfoFormGroup.value,
    //   this.requestServiceFormGroup.value
    // );
  }

  requestDesginPrice() {
    // console.log(
    //   this.contactFormGroup.value,
    //   this.earthInfoFormGroup.value,
    //   this.serviceDetailsFormGroup.value
    // );
  }
}
