describe('collection of test case', () => {
    const baseURL = "https://api.trello.com";
    const apiKey = "key";
    const apiToken = "token";
    let id;
    it('Create a Board', () => {
        cy.request({
            method:"POST",
            url:baseURL+"/1/boards",
            qs:{
                name:"Project management",
                key:apiKey,
                token:apiToken
            }
        }).then(response=>{
            const res = JSON.parse(JSON.stringify(response.body));
            id = res.id;
            cy.log(res);
        })
        cy.log("Board Created")
    });

    it('Retrieving Detials of Boards', () => {
        cy.request({
            method:"GET",
            url:baseURL+"/1/boards/"+id,
            qs:{
                name:"Get Request",
                key:apiKey,
                token:apiToken
            }
        }).then(response=>{
            const res = JSON.parse(JSON.stringify(response.body));
            cy.log(res);
        })
        cy.log("Your Board is Found")
    });

    it('Updating Detials of Boards', () => {
        cy.request({
            method:"PUT",
            url:baseURL+"/1/boards/"+id,
            qs:{
                name:"Updated board",
                key:apiKey,
                token:apiToken
            }
        }).then(response=>{
            const res = JSON.parse(JSON.stringify(response.body));
            cy.log(res);
        })
        cy.log("Your Board is Updated")
    });
    
    it('Deleting the Most Recent Board', () => {
        cy.request({
            method:"DELETE",
            url:baseURL+"/1/boards/"+id,
            qs:{
                name:"Deleting a Board",
                key:apiKey,
                token:apiToken
            }
        }).then(response=>{
            const res = JSON.parse(JSON.stringify(response.body));
            cy.log(res);
        })
        cy.log("Board Deleted")
    });

//tests for error handling:
    it('Retrieve a non-existent board', () => {
        const nonExistentBoardId = 'invalid-id';
        cy.request({
            method: 'GET',
            url:baseURL+"/1/boards/"+id,
            qs: {
                key: apiKey,
                token: apiToken,
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(404);
            cy.log('error! Board not found');
        });
    });

    it('Delete a non-existent board', () => {
        const nonExistentBoardId = 'invalid-id';
        cy.request({
            method: 'DELETE',
            url:baseURL+"/1/boards/"+id,
            qs: {
                key: apiKey,
                token: apiToken,
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(404);
            cy.log('error!! Board not found');
        });
    });
});