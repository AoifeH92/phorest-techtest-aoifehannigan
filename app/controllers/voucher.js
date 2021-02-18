import Controller from '@ember/controller';
import { task } from 'ember-concurrency'; 
import fetch from 'fetch';
import { tracked } from '@glimmer/tracking';

export default class VoucherController extends Controller {
  @tracked email = '';
  @tracked phone = '';
  @tracked clients;

  businessId = 'eTC3QY5W3p_HmGHezKfxJw';
  namespace = '/third-party-api-server/api';

  @task *queryClients() {
    let params = new URLSearchParams({ email: this.email, phone: this.phone });
    params = this.removeEmptyParams(params.toString());

    const url = `${this.namespace}/business/${this.businessId}/client?`;
    let response = yield fetch(`${url}${params}`, {
      headers: {
        'Username': 'global/cloud@apiexamples.com',
        'Password': 'VMlRo/eh+Xd8M~l'
      }
    }); 

    let json = yield response.json();
    this.clients = json._embedded.clients;
  }

  removeEmptyParams(query) {
    return query.replace(/[^=&]+=(?:&|$)/g, "");
  }
  
  
}

