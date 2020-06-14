import { PostModel } from './PostModel';

test('日付のフォーマットが正しいこと', () => {
  const testee = new PostModel({
    published_date: '2020-06-14T15:46:32.429586',
  });
  expect(testee.published_date_yyyymmdd).toBe('2020/06/14');
});
