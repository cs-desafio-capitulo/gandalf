import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
global.app = app;
global.request = supertest(app);
global.expect = expect;


describe('Routes: Users', () => {
    let request=global.request;
 

        const defaultUser = {
            name: 'Default user',
            email:'user@user.com',
            password:'123', 
            permission:'user',
            criate_date:1513958972398,
            update_date: 1513958972398,
            last_login:1513958972398
            };

    
            describe('GET/ users', ()=>{
                context('Hello World',()=>{
                    it('Should return Hello World',(done)=>{
                        request.get('/users')
                        .end((err,res)=> {
                            expect(res.body).to.eql({text:'Hello World!'});
                        done(err);})
                    })
                })
            });
  
            describe('POST /user', () => {
               context('when posting a user', () => {
                 it('should return a new user with status code 200', (done) => {
                    const customId = '56cb91bdc3464f14678934ca';
                    const newUser = Object.assign({}, { _id: customId, __v: 0 }, defaultUser);
                    const expectedSavedUser = {
                       _id: customId,
                        name: 'Default user',
                        email:'user@user.com',
                        password:'123', 
                        permission:'user',
                        criate_date:1513958972398,
                        update_date: 1513958972398,
                        last_login:1513958972398,
                        token:'1234567'
                    };
                
                      request
                        .post('/user')
                        .send(newUser)
                        .end((err, res) => {
                          expect(res.statusCode).to.eql(200);
                           expect(res.body).to.eql(expectedSavedUser);
                           done(err);
                        });
                    });
               });
             });describe('POST /singin', () => {
                context('when posting a pasword', () => {
                  it('should return a token ', (done) => {
                     const User = Object.create({}, {email:'user@user.com', password:'123', });
                     const expectedUser = {
                         email:'user@user.com',
                         permission:'user',
                         token:'1234567'
                     };
                 
                       request
                         .post('/user')
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