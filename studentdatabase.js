
var mysql=require('mysql');
var Ref=require('http');
var URL=require('url');


function connection(){
    var con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"studentdetails"
    });
    con.connect(function(err){
        if(err) {
            console.log(err);
            console.log("error")
        } else {
            console.log("Connected");
            }}
    );
         return con;
        }
        var Server=Ref.createServer(function(Req,Res){
        var myurl=URL.parse(Req.url,true);
        var mydata = myurl.query;
        Res.writeHead(200, {'content-type': 'text/html'})
        var con=connection();
        if(myurl.pathname == "/"){
        con.query("Select * from personal", function(err,data){
            data.forEach(function(rec){
                Res.write("<h1> Personal</h1>")

                Res.write(rec.regno + "<a href='http://localhost:8028/results?id=" +rec.regno + "'>" + rec.name + "</a>" + rec.address)
                Res.write("<a href='http://localhost:8028/delete?regno=" +rec.regno +"'> Delete</a>")
               
                // Res.write("Personal<br>")
                // Res.write(""+ rec.regno);
                // Res.write("<a href='http://localhost:8028/results?id=" +rec.regno + "'>" + rec.name +"</a>");
                // Res.write(""+ rec.address);
            })
            Res.end();
        });
    }
        else if (myurl.pathname == "/results"){
            var total =0;
            var percentage;
            Res.write("<a href='http://localhost:8028/results=" + "'> Home</a>")
            Res.write("<h1> Results</h1>")
            con.query("Select * from results where regno = "+ mydata.id, function(err,data){
                Res.write("<table style='border: 1px solid; padding: 10px;'>");
                //Res.write("<border="1">")
                Res.write("<tr>")
                Res.write("<th style='border: 1px solid;'> RegNo </th>")
                Res.write("<th style='border: 1px solid;'> Subject </th>")
                Res.write("<th style='border: 1px solid;'> Marks </th>")
                Res.write("<th style='border: 1px solid;'> Percentage </th>")
                Res.write("</tr>")
                data.forEach(function(rec){
                    var per = (rec.marks*100)/150;
                    Res.write("<tr>")
                    Res.write("<td>"+ "" + rec.regno+" " + "</td>");
                    Res.write("<td>"+""+ rec.subject+" "+ "</td>");
                    Res.write("<td>"+""+ rec.marks+" "+ "</td>");
                    Res.write("<td>"+""+ per+"</td>");
                    Res.write("</tr>");
                    
                    total += rec.marks
                    percentage = per
                    
                });

                Res.write("<tr>");
                Res.write("<td></td>");
                Res.write("<td></td>");
                Res.write("<td>Total: " + total + "</td>");
                Res.write("<td>Percentage: " + percentage + "</td>");
                Res.write("</tr>")
                Res.write("</table");                
                Res.end();
            });

           
        }  

        else if (myurl.pathname == "/delete"){
            //  Res.write("Delete: " + mydata.id)
            con.query("Delete from personal where regno = " + mydata.regno, function(err,data){
              Res.write("user deleted")

            });
            

        
        }

        else if (myurl.pathname == "/home"){
            Res.write("home")
        }

        

    });

   

        Server.listen(8028)

       
       // Res.write("<a href='http://localhost:8021/results?value=10'></a><br>");