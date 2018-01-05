import supertest from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

import Myapp from '../../../src/app';
import UserController from '../../../src/controllers';

describe('Routes: Users', () => {
    let request;
    before(async()=>{
        const app = await Myapp();
        request = supertest(app);});


    after(() => {
      mongoose.connection.close();
    });
  
    const defaultUser = {
            name: 'Default user',
            email:'user@user.com',
            password:'123', 
            permission:'user',
            criate_date: 1513958972398, 
            update_date: 1513958972398, 
            last_login: 1513958972398
            };

        const customId = '56cb91bdc3464f14678934ca';
        const newUser = Object.assign({}, { _id: customId }, defaultUser);
        const expectedSavedUser = {
        _id: customId,
        name: 'Default user',
        email:'user@user.com',
        password:'123', 
        permission:'user',
        criate_date:'2017-12-22T16:09:32.398Z',
        update_date: '2017-12-22T16:09:32.398Z',
        last_login:1513958972398,
        token:''
    };     
    describe('POST /signup', () => {
        context('when posting a user', () => {
            it('should return a new user with status code 200', (done) => {
                request
                    .post('/signup')
                    .send(defaultUser)
                    .end((err) => {
                         expect(200, expectedSavedUser, done);
                });
             });
             
        });
    });

            describe('POST /singin', () => {
                context('when posting a pasword', () => {
                  it('should return a token ', done => {
                     const User = Object.assign({}, {email:'Newuser@user.com', password:'pass'});
                     const expectedUser = {
                         email:'user@user.com',
                         permission:'user',
                         token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTRjZmUzMWNhMTQwYzdiYzE5YmJmZDgiLCJuYW1lIjoidXNlciIsImVtYWlsIjoiTmV3dXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiZDc0ZmYwZWU4ZGEzYjk4MDZiMThjODc3ZGJmMjliYmRlNTBiNWJkOGU0ZGFkN2EzYTcyNTAwMGZlYjgyZThmMSIsIl9fdiI6MCwibGFzdF9sb2dpbiI6IjIwMTgtMDEtMDNUMTY6MDA6NDkuNjcwWiIsInVwZGF0ZV9kYXRlIjoiMjAxOC0wMS0wM1QxNjowMDo0OS42NzBaIiwicGVybWlzc2lvbiI6InVzZXIiLCJpYXQiOjE1MTUwNjk1OTd9.8ERcidF4ibLznDGQXpkT_mN4zvg0mrNsPHt3dQxpSE4'
                     };
 
                       request
                         .post('/signin')
                         .send(User)
                         .end((err, res) => {
                           expect(res.statusCode).to.eql(200);
                            expect(res.body).to.eql(expectedUser);
                            done(err);
                         });
                     });
                });
              });
});