import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {app} from "firebaseApp";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FirestoreError } from "firebase/firestore";

export default function LoginForm() {
    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);

            toast.success("로그인에 성공했습니다.");
            navigate("/");
        } catch (error) {
            if (error instanceof (FirebaseError || FirestoreError)) {
                toast.error(error?.code);
            } else {
                toast.error((error as Error)?.message);
            }
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;

        if (name === "email") {
            setEmail(value);
            const validRegex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (!value?.match(validRegex)) {
                setError("이메일 형식이 올바르지 않습니다.");
            } else {
                setError("");
            }
        }

        if (name === "password") {
            setPassword(value);

            if (value?.length < 8) {
                setError("비밀번호는 8자리 이상 입력해주세요.");
            } else {
                setError("");
            }
        }
    };

    return (
        <form onSubmit={onSubmit} className="form form--lg">
            <h1 className="form__title">로그인</h1>
            <div className="form__block">
                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    required
                    onChange={onChange}
                />
            </div>
            <div className="form__block">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    required
                    onChange={onChange}
                />
            </div>
            {error && error?.length > 0 && (
                <div className="form__block">
                    <div className="form_error">{error}</div>
                </div>
            )}
            <div className="form__block">
                계정이 없으신가요?
                <Link to="/signup" className="form__link">
                    회원가입하기{" "}
                </Link>
            </div>
            <div className="form-block">
                <input
                    type="submit"
                    value="로그인"
                    className="form__btn--submit"
                    disabled={error?.length > 0}
                />
            </div>
        </form>
    );
}
