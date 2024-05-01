import { NextResponse } from "next/server"
import { JsonDB, Config } from "node-json-db";
import { PokemonData } from "../../../../types";

const db = new JsonDB(new Config("db", true, true, "/"));

export async function GET(request: Request) {
  try {
    const myPokemon: PokemonData[] = await db.getData("/myPokemon");
    return NextResponse.json({ myPokemon }, { status: 200 })
  } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newPokemon: PokemonData = await request.json()
    // index sera igual a -1 si el pokemon no esta en la db, si esta sera el valor del indice
    const index = await db.getIndex("/myPokemon", Number(newPokemon.id), "id");

    if (index === -1) {
      // Agrego el nuevo pokemon a la db
      await db.push("/myPokemon[]", newPokemon);
      await db.push("/myPokemonIds[]", Number(newPokemon.id));
      return NextResponse.json({ success: `Caught ${newPokemon.name}` }, { status: 200 })
    } else {
      return NextResponse.json({ error: `You already caught ${newPokemon.name}` }, { status: 409 })
    }

  } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const deletePokemon: PokemonData = await request.json()
    // index sera igual a -1 si el pokemon no esta en la db, si esta sera el valor del indice
    const index = await db.getIndex("/myPokemon", Number(deletePokemon.id), "id");
    if (index !== -1) {
      // Elimino el pokemon de la db
      await db.delete(`/myPokemon[${index}]`)
      await db.delete(`/myPokemonIds[${index}]`)
      
      return NextResponse.json({ success: `You freed ${deletePokemon.name}` }, { status: 200 })
    } else {
      return NextResponse.json({ error: `${deletePokemon.name} not found!` }, { status: 409 })
    }
    
  } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
  }
  
}
 
