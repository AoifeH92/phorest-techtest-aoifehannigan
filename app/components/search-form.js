import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SearchFormComponent extends Component {
  @tracked email = '';
  @tracked phone = '';
  @tracked isEmpty = false;

  @action 
  submitForm(email, phone) {
    if(email || phone){
      this.args.queryClients.perform(email, phone);
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }
}
