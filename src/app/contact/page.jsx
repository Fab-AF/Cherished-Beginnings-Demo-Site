"use client";
import { errorMeg, successMeg } from "@/modules/utils";
import { postApi } from "@/Redux/api";
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await postApi("/users/contact-us", data).then((res) => {
      if (res?.data?.success) {
        reset();
        successMeg(res?.data?.messaeg);
      } else {
        errorMeg(res?.data?.messaeg);
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <Container
      style={{
        maxWidth: "500px",
        padding: "20px",
        backgroundColor: "#fdf2e9",
        borderRadius: "8px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formName">
          <Form.Label>
            Full Name<span className="text-danger">*</span>
          </Form.Label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("full_name", { required: "Full Name is required" })}
          />
          <div className="text-danger">{errors.full_name?.message}</div>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>
            Email address<span className="text-danger">*</span>
          </Form.Label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
          />
          <div className="text-danger">{errors.email?.message}</div>
        </Form.Group>

        <Form.Group controlId="formCompany">
          <Form.Label>
            Company<span className="text-danger">*</span>
          </Form.Label>
          <input
            type="text"
            placeholder="Enter your company name"
            {...register("company", { required: "Company name is required" })}
          />
          <div className="text-danger">{errors.company?.message}</div>
        </Form.Group>

        <Form.Group controlId="formSubject">
          <Form.Label>
            Subject<span className="text-danger">*</span>
          </Form.Label>
          <input
            type="text"
            placeholder="Enter the subject"
            {...register("subject", { required: "Subject is required" })}
          />
          <div className="text-danger">{errors.subject?.message}</div>
        </Form.Group>

        <Form.Group controlId="formMessage">
          <Form.Label>
            Message<span className="text-danger">*</span>
          </Form.Label>
          <input
            as="textarea"
            rows={3}
            placeholder="Write your message here..."
            {...register("message", {
              required: "Message is required",
              maxLength: {
                value: 255,
                message: "Message cannot exceed 255 characters",
              },
            })}
          />
          <div className="text-danger">{errors.message?.message}</div>
        </Form.Group>

        <button type="submit" className="mt-3">
          {loading ? (
            <div className="spinner-border" color="#9e4b34" role="status"></div>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </Container>
  );
};

export default ContactForm;
