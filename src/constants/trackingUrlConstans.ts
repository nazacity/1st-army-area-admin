import { ETrackingCompanyName } from 'models/order.model';

export const trackingCompanyUrl = {
  [ETrackingCompanyName.Flash]: 'https://www.flashexpress.com/tracking/?se=',
  [ETrackingCompanyName['J&T']]:
    'https://www.jtexpress.co.th/index/query/gzquery.html?bills=',
  [ETrackingCompanyName['Thailand-post']]:
    'https://track.thailandpost.co.th/?trackNumber=',
  [ETrackingCompanyName.DHL]: 'https://ecommerceportal.dhl.com/track/?ref=',
  [ETrackingCompanyName.KERRY]: 'https://th.kerryexpress.com/en/track/?track=',
};

// https://help.bentoweb.com/th/article/4lil4li04lih4lib4lmm4liq4liz4lir4lij4lix4lia4liv4lij4lin4lii4liq4lit4lia4liq4liw4liy4liz4liw4lib4liy4lij4lii4lix4liu4liq4lmi4lih4liq4li04liz4lie4lmj4liy-uh8as2/
