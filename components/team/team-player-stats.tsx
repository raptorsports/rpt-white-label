"use client"

import { useState, useEffect } from "react"

export function TeamPlayerStats({
  players,
  stats
}: {
  players: any[]
  stats: any[]
}) {

  const [open,setOpen] = useState(false)

  useEffect(() => {

    const esc = (e:KeyboardEvent)=>{
      if(e.key === "Escape") setOpen(false)
    }

    window.addEventListener("keydown",esc)

    return ()=>window.removeEventListener("keydown",esc)

  },[])

  const rows = players.map(player => {

    const stat = stats.find(s => s.playerID === player.id)
    const hockey = stat?.hockey ?? {}

    return {
      number: player.playerNumber ?? "-",
      name: player.name,
      pos: hockey.pos ?? player.position ?? "-",
      gp: Number(hockey.gp ?? 0),
      g: Number(hockey.g ?? 0),
      a: Number(hockey.a ?? 0),
      pts: Number(hockey.pts ?? 0),
      ppga: hockey.ppga ?? "0",
      pim: Number(hockey.pim ?? 0),
      ppg: hockey.ppga ?? "0"
    }

  })

  const sorted = [...rows].sort((a,b)=>{

    if (b.pts !== a.pts) return b.pts - a.pts
    if (b.g !== a.g) return b.g - a.g
    return b.a - a.a

  })

  return (
    <>

      {/* PLAYER LIST */}

      <div className="space-y-4">

        {players.map(player => {

          const eligible = false

          return (

            <div
              key={player.id}
              onClick={()=>setOpen(true)}
              className="relative group flex items-center justify-between rounded-xl border bg-white px-6 py-6 hover:shadow-lg hover:-translate-y-[1px] cursor-pointer transition"
            >

              <div className="flex items-center pl-24">

                <div className="absolute left-2 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-md font-bold text-gray-700 shadow-sm">
                  #{player.playerNumber ?? "—"}
                </div>

                <img
                  src={player.imageURL ?? "/player-placeholder.png"}
                  className="absolute left-12 bottom-0 h-24 object-contain transition group-hover:-translate-y-1"
                />

                <div className="text-lg font-semibold text-gray-700 ml-10 group-hover:text-orange-500 transition">
                  {player.name}
                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="flex flex-col items-center -mt-4">

                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Playoffs
                  </span>

                  <div
                    className={`px-3 py-1 rounded-full text-xs uppercase font-semibold text-white ${
                      eligible ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {eligible ? "Eligible" : "Ineligible"}
                  </div>

                </div>

                <div className="px-4 py-1 rounded-full text-sm font-semibold bg-orange-500 text-white">
                  {player.position ?? "NONE"}
                </div>

              </div>

            </div>

          )

        })}

      </div>


      {/* MODAL */}

      {open && (

        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={()=>setOpen(false)}
          />

          <div className="relative w-[95vw] max-w-6xl h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b px-6 py-4">

              <h2 className="text-lg font-semibold">
                Player Stats
              </h2>

              <button
                onClick={()=>setOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-xl"
              >
                ✕
              </button>

            </div>


            {/* TABLE */}

            <div className="flex-1 overflow-x-auto">

              <table className="min-w-[900px] w-full text-sm">

                <thead className="bg-orange-500 text-white">

                  <tr className="text-left">

                    <th className="px-6 py-3 sticky left-0 bg-orange-500 z-20">
                      #
                    </th>

                    <th className="px-6 py-3 sticky left-[60px] bg-orange-500 z-20">
                      Name
                    </th>

                    <th className="px-6 py-3">Pos</th>
                    <th className="px-6 py-3">GP</th>
                    <th className="px-6 py-3">G</th>
                    <th className="px-6 py-3">A</th>
                    <th className="px-6 py-3">Pts</th>
                    <th className="px-6 py-3">PPGA</th>
                    <th className="px-6 py-3">PIM</th>
                    <th className="px-6 py-3">PPG</th>

                  </tr>

                </thead>

                <tbody>

                  {sorted.map((row,i)=>(

                    <tr
                      key={i}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="px-6 py-4 font-semibold text-gray-600 sticky left-0 bg-white z-10">
                        {row.number}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-800 sticky left-[60px] bg-white z-10">
                        {row.name}
                      </td>

                      <td className="px-6 py-4 font-semibold">{row.pos}</td>
                      <td className="px-6 py-4 font-semibold">{row.gp}</td>
                      <td className="px-6 py-4 font-semibold">{row.g}</td>
                      <td className="px-6 py-4 font-semibold">{row.a}</td>
                      <td className="px-6 py-4 font-bold">{row.pts}</td>
                      <td className="px-6 py-4 font-semibold">{row.ppga}</td>
                      <td className="px-6 py-4 font-semibold">{row.pim}</td>
                      <td className="px-6 py-4 font-semibold">{row.ppg}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}

    </>
  )

}