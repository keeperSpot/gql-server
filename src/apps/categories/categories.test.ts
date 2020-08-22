import { Server } from 'server';
import { Connection } from 'typeorm';
import { TestClient } from '../../server/client';
import { Category } from '../categories.entity';

let conn: Connection;
beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});

const $categories = (representation:string) => `
    query{
           categories(representation:"${representation}"){
             name
             code
             representation
           }
    }
`;

const $addCategory = (name: string, code: string, representation: string,) => `
    mutation {
       addCategory(name: "${name}",code:"${code}",representation:"${representation}"){
           name
           code
           representation
        }
}
`;


describe('categories',()=>{
    test('fetch base categories', async () => {
        const client = new TestClient();
        const count =await Category.count();
        const {categories} = await client.query($categories(null));
        expect(count).toEqual(categories.length);
    });
    test('fetch filtered categories', async () => {
        const client = new TestClient();
        const count =await Category.count();
        const {categories} = await client.query($categories('base'));
        expect(count).toEqual(categories.length);
        categories.map((cat)=>{
            expect(cat.parent).toEqual('base');
        });
    });
    test('adding category',async()=>{
        const client = new TestClient();
        const newCategory = new Category()
        newCategory.name = 'testCategory'
        newCategory.code='po789'
        newCategory.representation='/testCategory'
        await newCategory.save()
        console.log(newCategory);
        const  addCategory = await client.query($addCategory(newCategory.name,newCategory.code,newCategory.representation));
        console.log(addCategory);
        // const {name}=addCategory;
        // expect(name).toEqual(newCategory.name);
    })

})
