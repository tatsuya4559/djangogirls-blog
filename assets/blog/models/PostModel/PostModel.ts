import { Record } from 'immutable';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

export class PostModel extends Record({
  pk: 0,
  title: '',
  text: '',
  published_date: '',
}) {
  get published_date_yyyymmdd() {
    return format(parseISO(this.published_date), 'yyyy/MM/dd');
  }
}
