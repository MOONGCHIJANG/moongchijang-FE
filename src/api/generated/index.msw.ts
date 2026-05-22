import { getAdminMock } from './admin/admin.msw';
import { getAuthMock } from './auth/auth.msw';
import { getGroupBuyRequestMock } from './group-buy-request/group-buy-request.msw';
import { getGroupBuyMock } from './group-buy/group-buy.msw';
import { getMyPageMock } from './my-page/my-page.msw';
import { getNotificationMock } from './notification/notification.msw';
import { getOwnerMock } from './owner/owner.msw';
import { getParticipationMock } from './participation/participation.msw';
import { getPickupMock } from './pickup/pickup.msw';
import { getWishlistMock } from './wishlist/wishlist.msw';

export const generatedHandlers = [
  ...getAdminMock(),
  ...getAuthMock(),
  ...getGroupBuyRequestMock(),
  ...getGroupBuyMock(),
  ...getMyPageMock(),
  ...getNotificationMock(),
  ...getOwnerMock(),
  ...getParticipationMock(),
  ...getPickupMock(),
  ...getWishlistMock(),
];
