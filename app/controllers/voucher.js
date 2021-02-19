import Controller from '@ember/controller';
import { task } from 'ember-concurrency'; 
import fetch from 'fetch';
import { tracked } from '@glimmer/tracking';

const headers = {
  'Username': 'global/cloud@apiexamples.com',
  'Password': 'VMlRo/eh+Xd8M~l',
  "Content-Type": "application/json"
}

export default class VoucherController extends Controller {
  @tracked clients;
  @tracked voucher;

  businessId = 'eTC3QY5W3p_HmGHezKfxJw';
  branchId = 'SE-J0emUgQnya14mOGdQSw';
  urlNamespace = '/third-party-api-server/api';


  @task *queryClients(email, phone) {
    let params = new URLSearchParams({ email, phone });
    params = this.removeEmptyParams(params.toString());

    const url = `${this.urlNamespace}/business/${this.businessId}/client?`;
    let response = yield fetch(`${url}${params}`, {
      headers
    }); 

    let json = yield response.json();
    this.clients = json._embedded.clients;
  }

  @task *createVoucher(client, value) {
    const url = `${this.urlNamespace}/business/${this.businessId}/voucher`;

    let response = yield fetch(url, {
      headers,
      method: 'post',
      body: JSON.stringify({
        "clientId": client.id,
        "creatingBranchId": this.branchId,
        "expiryDate": new Date("2021-12-31"),
        "issueDate": new Date(),
        "originalBalance": value
      })
    });

    let json = yield response.json();
    this.voucher = json;
  }

  removeEmptyParams(query) {
    return query.replace(/[^=&]+=(?:&|$)/g, "");
  }
  
  
}

