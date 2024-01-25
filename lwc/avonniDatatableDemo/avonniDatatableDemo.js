import { LightningElement, wire,track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import getAccountsCount from '@salesforce/apex/AccountController.getAccountsCount';
import getAccountsCreatedLastYear from '@salesforce/apex/AccountController.getAccountsCreatedLastYear';
import { reduceErrors } from 'c/ldsUtils';
const actions = [
    { label: 'View', name: 'view', iconName: 'action:preview' },
    { label: 'Edit', name: 'edit', iconName: 'action:edit' },
    { label: 'Delete', name: 'delete', iconName: 'utility:delete' },
    { label: 'Save', name: 'save', iconName: 'utility:save' },
 ];
const COLUMNS = [
    { type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'left'  } },
    { label: 'Account Name', fieldName: NAME_FIELD.fieldApiName, type: 'text', editable:'true' , iconName: 'standard:account' },
    { label: 'Annual Revenue', fieldName: REVENUE_FIELD.fieldApiName, type: 'currency' , editable:'true' , iconName: 'standard:currency'},
    { label: 'Industry', fieldName: INDUSTRY_FIELD.fieldApiName, type: 'picklist' , editable:'true'},
    { label: 'CleanStatus', fieldName: 'CleanStatus', type: 'toggle' , editable:'true' , typeAttributes: { 
        size: 'small',
        label: 'Toggle'},
    cellAttributes: {
        alignment: 'center'
    }},
    { label: 'Is Public' , fieldName: 'isPublic__c', type: 'toggle' , editable:'true' ,  typeAttributes: { 
                size: 'small',
                label: 'Toggle'},
                cellAttributes: {
                    alignment: 'center'
             }},
    { label: 'CurrencyIsoCode', fieldName: 'CurrencyIsoCode', type: 'badge' },
    { label: 'Country', fieldName: 'Country__c', type: 'text', editable: true,iconName: 'custom:custom68' },
    {
        label: "Longitude",
        fieldName: "GeoLatLon__Longitude__s",
        type: "number",
        typeAttributes: { maximumFractionDigits: 4 }
      },
      {
        label: "Latitude",
        fieldName: "GeoLatLon__Latitude__s",
        type: "number",
        typeAttributes: { maximumFractionDigits: 4 }
      }
];
export default class AvonniDatatableDemo extends LightningElement {
    avatar = {
        fallbackIconName: 'standard:customers',
        size: 'large'
    };
    columns = COLUMNS;
    @track showModal = false;
    @wire(getAccounts)
    accounts;
    @wire(getAccountsCount)
    getAccountsCount;
    @wire(getAccountsCreatedLastYear)
    getAccountsCreatedLastYear;
    get errors() {
        return (this.accounts.error) ?
            reduceErrors(this.accounts.error) : [];
    }
    renderedCallback(){
        console.log('accounts ::',this.accounts)
    }
    handleClick(){
        this.showModal = true;
    }
    handleClose(){
        this.showModal = false;
    }
}