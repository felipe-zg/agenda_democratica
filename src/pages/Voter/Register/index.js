import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';

import BackButton from '../../../components/BackButton';
import Container from '../../../components/Container';
import Text from '../../../components/Text';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {Header, Photo} from './styles';

import addPhoto from '../../../assets/add.png';

const Register = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photo, setPhoto] = useState(null);
    return (
        <Container>
            <BackButton action={() => navigation.goBack()} title="lvoltar" />
            <Form>
                <Header>
                    <TouchableOpacity>
                        <Photo source={photo ? photo.path : addPhoto} />
                    </TouchableOpacity>
                </Header>

                <Text>Nome</Text>
                <Input value={name} onChangeText={setName} />
                <Text>E-mail</Text>
                <Input value={email} onChangeText={setEmail} />
                <Text>Confirme seu e-mail</Text>
                <Input value={confirmEmail} onChangeText={setConfirmEmail} />
                <Text>Senha</Text>
                <Input value={password} onChangeText={setPassword} />
                <Text>Confirme sua senha</Text>
                <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <Button
                    title="Cadastrar"
                    background="#00f"
                    callback={() => console.warn('cadastrando')}
                />
            </Form>
        </Container>
    );
};

export default Register;
