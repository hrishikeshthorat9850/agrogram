import { NextResponse } from "next/server";

export async function GET(){
    try{
        const apiUrl = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=38cfe7fceb6540bf95cf4b05401503b6";
        const response = await fetch(apiUrl);

        if(!response.ok){
            NextResponse({message : "Failed to fetch News from API", status : 500});
        }
        const data = await response.json();

        const slugify = (str)=>
            str
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
                .slice(0, 100);
        
        const articles = data.articles.map((article)=>({
                id: slugify(article.title),
                title : article.title,
                summary : article.content || article.description || "No summary available.",
                date: article.publishedAt,
                imgUrl: article.urlToImage,
                srcUrl: article.url,
        }));

        return NextResponse.json({articles});
    }catch(e){
        console.log("Error is :",e);
    }
}