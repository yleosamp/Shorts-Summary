import { server } from "./server.js"

const form = document.querySelector('#form')
const input = document.querySelector('#url')
const content = document.querySelector('.loading')

form.addEventListener("submit", async(event) => {
  event.preventDefault()
  content.classList.add("loading")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return content.textContent = "Esse vídeo não é um shorts"
  }

  const [_, params] = videoURL.split('/shorts/')
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio"

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  
  const summary = await server.post("/summary", {
    text: summary.data.result,
  })
  
  content.textContent = summary.data.result
  content.classList.remove("loading")
})