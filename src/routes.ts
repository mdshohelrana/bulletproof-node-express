import { Router, Request, Response } from 'express'
import { getRepository, FindOneOptions } from 'typeorm'
import { Room } from './entities/Room'
import { Video } from './entities/Video'

const router = Router()

// Rooms Routes

// Get all rooms
router.get('/rooms', async (req: Request, res: Response) => {
  try {
    const roomRepository = getRepository(Room)
    const rooms = await roomRepository.find()
    return res.json(rooms)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Create a new room
router.post('/rooms', async (req: Request, res: Response) => {
  try {
    const { name, description }: { name: string; description: string } =
      req.body
    const roomRepository = getRepository(Room)
    const room = new Room()
    room.name = name
    room.description = description
    await roomRepository.save(room)
    return res.status(201).json(room)
  } catch (error) {
    console.error('Error creating room:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Update a room by ID
router.put('/rooms/:id', async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id // Explicitly define type as string
    const { name, description }: { name: string; description: string } =
      req.body
    const roomRepository = getRepository(Room)
    const room = await roomRepository.findOne(id)
    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }
    room.name = name
    room.description = description
    await roomRepository.save(room)
    return res.json(room)
  } catch (error) {
    console.error('Error updating room:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete a room by ID
router.delete('/rooms/:id', async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id // Explicitly define type as string
    const roomRepository = getRepository(Room)
    const room = await roomRepository.findOne(id)
    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }
    await roomRepository.remove(room)
    return res.status(204).send()
  } catch (error) {
    console.error('Error deleting room:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Videos Routes

// Get all videos
router.get('/videos', async (req: Request, res: Response) => {
  try {
    const videoRepository = getRepository(Video)
    const videos = await videoRepository.find()
    return res.json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Create a new video
router.post('/videos', async (req: Request, res: Response) => {
  try {
    const { title, url, roomId }: { title: string; url: string; roomId: any } =
      req.body // Explicitly define type of roomId as string
    const roomRepository = getRepository(Room)
    const room = await roomRepository.findOne(roomId)
    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }
    const videoRepository = getRepository(Video)
    const video = new Video()
    video.title = title
    video.url = url
    video.room = room
    await videoRepository.save(video)
    return res.status(201).json(video)
  } catch (error) {
    console.error('Error creating video:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Update a video by ID
router.put('/videos/:id', async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id // Explicitly define type as string
    const { title, url, roomId }: { title: string; url: string; roomId: any } =
      req.body // Explicitly define type of roomId as string
    const videoRepository = getRepository(Video)
    const video = await videoRepository.findOne(id)
    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }
    const roomRepository = getRepository(Room)
    const room = await roomRepository.findOne(roomId)
    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }
    video.title = title
    video.url = url
    video.room = room
    await videoRepository.save(video)
    return res.json(video)
  } catch (error) {
    console.error('Error updating video:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete a video by ID
router.delete('/videos/:id', async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id // Explicitly define type as string
    const videoRepository = getRepository(Video)
    const video = await videoRepository.findOne(id)
    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }
    await videoRepository.remove(video)
    return res.status(204).send()
  } catch (error) {
    console.error('Error deleting video:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
