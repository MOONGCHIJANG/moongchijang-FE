/**
 * MSW 핸들러에서 사용할 커스텀 mock 데이터 생성 함수 모음.
 *
 * koFaker를 사용해 서비스에 맞는 한글 데이터를 생성합니다.
 * Orval 자동 생성 핸들러(generatedHandlers)를 덮어써야 할 때 여기에 추가하세요.
 *
 * 추가 예시:
 *   export function createGroupBuyDetailMock(id: number) {
 *     return {
 *       success: true,
 *       data: {
 *         id,
 *         storeName: koFaker.store.name(),
 *         productName: koFaker.product.name(),
 *         ...
 *       },
 *       error: null,
 *     };
 *   }
 */

export { koFaker } from './ko-faker';
