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




describe('categories',()=>{
    test('fetch base categories', async () => {
        const client = new TestClient();
        const count =await Category.count();
        const newCategory=new Category();
        newCategory.name='Electronics';
        newCategory.code='df123gr';
        newCategory.representation='electronics'
        newCategory.parent='base';
        await newCategory.save();
        const {categories} = await client.query($categories());
        expect(count).toEqual(categories.length);
    });


})