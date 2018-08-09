import Route from '@ember/routing/route';
import {
  inject
} from '@ember/service'


export default Route.extend({
  session: inject(),
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },

  model() {
    return this.store.findAll('tournament')
  },
  actions: {

    saveAttender(Tournament) {
      let email = '';
      if (this.get('session').get('currentUser')) {
        email = this.get('session').get('currentUser').email;
      }

      if (email == '') {
        alert("Please sign in!");
      } else {

        let attending = 0;

        let test = Tournament.hasMany('people');

        for (var i = 0; i < test.hasManyRelationship.canonicalMembers.list.length; i++) {
          if (test.hasManyRelationship.canonicalMembers.list[i].__data.body == email) {
            alert("Already Attending");


            attending = 1;
          }
        }

        if (attending == 0) {
          alert("Thank you for signing up!");
          var newCompetitor = this.store.createRecord('competitor', {
            body: email
          });
          Tournament.get('people').pushObject(newCompetitor);
          Tournament.save();
        }


      }
    },

    deleteAttender(Tournament) { //attempt to remove user from the attendee list

      let confirmation = confirm("Are you sure you want to not attend?")

      if (confirmation) {

        let email = '';
        if (this.get('session').get('currentUser')) {
          email = this.get('session').get('currentUser').email;
        }


        console.log(Tournament.get('people'));
        // .findRecord('email', email).then(() =>{
        //   email.deleteRecord();
        // });
      }







    }
  }

});
