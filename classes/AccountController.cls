public without sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Name, AnnualRevenue, Industry , GeoLatLon__c
            ,GeoLatLon__Latitude__s, GeoLatLon__Longitude__s, Country__c, CleanStatus, isPublic__c, CurrencyIsoCode
            FROM Account
            ORDER BY Name
            LIMIT 10
        ];
    }
    @AuraEnabled(cacheable=true)
    public static Integer getAccountsCount() {
        Integer cant = [SELECT Count() FROM Account];
        return cant;
    }
    @AuraEnabled(cacheable=true)
    public static Integer getAccountsCreatedLastYear() {
        Integer cant = [SELECT Count() FROM Account WHERE CreatedDate > = LAST_YEAR ];
        return cant;
    }
    

    

}