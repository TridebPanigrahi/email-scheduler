import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { emailSchema } from "../validations/emailSchema";
import { clientApi } from "../services/api";
import { toast } from "react-toastify";
export default function ScheduleEmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(emailSchema),
  });
  const onSubmit = async (data) => {
    try {
      clientApi.post("/email/schedule", data);
      toast.success("Email Scheduled Successfully");
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to schedule email");
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" mb={2}>
          Schedule Email
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Recipent Email"
            {...register("to")}
            error={!!errors.to}
            helperText={errors.to?.message}
          />
          <TextField
            label="Subject"
            {...register("subject")}
            error={!!errors.subject}
            helperText={errors.subject?.message}
          />
          <TextField
            label="Email Body"
            multiline
            rows={4}
            {...register("body")}
            error={!!errors.body}
            helperText={errors.body?.message}
          />
          <TextField
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            {...register("scheduledTime")}
            error={!!errors.scheduledTime}
            helperText={errors.scheduledTime?.message}
          />
          <Button variant="contained" type="submit" size="large">
            Schedule Email
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
