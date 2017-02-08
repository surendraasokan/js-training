"use strict";

describe("Google map Spec", function() {
    var locationSpecObj;
    beforeEach(function(){
        locationSpecObj = new LocationClass("Columbus");
        spyOn(locationSpecObj, "getLatitudeLongitude");
    });
    
    it("should display Map", function() {
        locationSpecObj.getLatitudeLongitude("Columbus");
        
        expect(locationSpecObj.getLatitudeLongitude).shouldHaveBeenCalled();
    });
});