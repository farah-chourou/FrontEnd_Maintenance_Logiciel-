import { Helmet } from "react-helmet-async";
import { useState } from "react";
// @mui
import {
  Typography,
  Container,
  Stack,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Paper,
  Avatar,
} from "@mui/material";

export default function DashboardPage() {
  return (
    <Container>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
    </Container>
  );
}
