import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import BoardSideBar from './BoardSideBar'
const MovileDisplayBoards = ({isOpen,onOpen,onClose}) => {
  return (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay />

    <DrawerContent>
      <DrawerHeader borderBottomWidth='1px'>Boards Data</DrawerHeader>
      <DrawerCloseButton />
      <DrawerBody>
      <BoardSideBar />
      </DrawerBody>
    </DrawerContent>
  </Drawer>
  )
}

export default MovileDisplayBoards