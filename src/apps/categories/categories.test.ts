import { Server } from 'server';
import { Connection } from 'typeorm';
import { TestClient } from '../../server/client';
import { Category } from './categories.entity';


let conn: Connection;
beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});

const $categories = () => `
    query{
           categories{
             name
             code
             representation
             parent
           }
    }
`;

const $addCategory = (name: string, code: string, representation: string, parent: string) => `
    mutation {
       addCategory(name: "${name}",code:"${code}",representation:"${representation}",parent:"${parent}"){
           name
           code
           representation
           parent
        }
}
`;


describe('categories',()=>{
    test('fetch base categories', async () => {
        const client = new TestClient();
        const count =await Category.count();
        const {categories} = await client.query($categories());
        expect(count).toEqual(categories.length);
    });
    // test('adding category',async()=>{
    //     const client = new TestClient();
    //     const newCategory = new Category();
    //     newCategory.name = 'testCategory';
    //     newCategory.code='po789';
    //     newCategory.parent='base';
    //     newCategory.representation='/testCategory'
    //     await newCategory.save()
    //     const { addCategory } = await client.query($addCategory(newCategory.name,newCategory.code,newCategory.representation,newCategory.parent));
    //     const {name}=addCategory;
    //     expect(name).toEqual(newCategory.name);
    // })

})