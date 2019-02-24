import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bills',
  templateUrl: 'bills.page.html',
  styleUrls: ['bills.page.scss']
})
export class BillsPage {

  bills: Object[] = [];

  constructor(
    public alertController: AlertController,
    private toastController: ToastController
  ) {
    this.bills = [
      {
        name: 'rent',
        amount: 300,
        rate: 'weekly'
      },
      {
        name: 'phone',
        amount: 40,
        rate: 'monthly'
      },
      {
        name: 'internet',
        amount: 60,
        rate: 'monthly'
      },
      {
        name: 'electricity',
        amount: 300,
        rate: 'quarterly'
      }
    ];
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'New Bill',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'name'
        },
        {
          name: 'amount',
          type: 'number',
          placeholder: 'amount'
        },
        {
          name: 'rate',
          type: 'text',
          placeholder: 'weekly'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            this.bills.push(data);
            this.presentToast(data);
          }
        }, 
        'Cancel']
    });

    await alert.present();
  }

  async presentToast(data) {
    const toast = await this.toastController.create({
      message: data.name + ' bill saved!',
      color: 'dark',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'done',
      duration: 2000
    });

    await toast.present();
  }

  async editBill(bill) {
    const alert = await this.alertController.create({
      header: 'Edit Bill',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: bill.name,
          placeholder: 'name'
        },
        {
          name: 'amount',
          type: 'number',
          value: bill.amount,
          placeholder: 'amount'
        },
        {
          name: 'rate',
          type: 'text',
          value: bill.rate,
          placeholder: 'weekly'
        }
      ],
      buttons: [
        {
          text: 'Save',
          handler: (data) => {
            const index = this.bills.indexOf(bill);
            if (index > -1) {
              this.bills[index] = data;
            }
            this.presentToast(data);
          }
        }, 
        'Cancel']
    });

    await alert.present();
  }

  async deleteBill(bill) {
    const index = this.bills.indexOf(bill);
    if (index > -1) {
      this.bills.splice(index, 1);
    }
  }
}