import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
//IMPORTAR PICKER DO MODULO RN COMMUNITY AO INVÉS DE REACT-NATIVE
// import {Picker} from '@react-native-community/picker';
import {Picker} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import Lottie from 'lottie-react-native';

import {addEvent, updateEvent} from '../../../../store/modules/Event/actions';

import loadAnimation from '../../../../assets/animations/load.json';

import {categories} from '../../../../utils/enums';
import {isDate, HasMinChars, errors} from '../../../../utils/validations';
import {handleInputChange} from '../../../../utils/handlers';

import Container from '../../../../components/Container';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import MaskedInput from '../../../../components/MaskedInput';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
import BackButton from '../../../../components/BackButton';

import {PickerView, MultilineInput} from './styles';

const renderCategories = () => {
    return categories.map((c) => {
        return <Picker.Item key={c.id} label={c.title} value={c.title} />;
    });
};

const renderAddresses = (addresses) => {
    return addresses.map((a) => {
        return (
            <Picker.Item
                key={a.addressKey}
                label={a.street + ', ' + a.number + ' - ' + a.county}
                value={a.addressKey}
            />
        );
    });
};

const Event = ({route, navigation}) => {
    // const event = route.params ? route.params.event : null;
    const event = null;
    const [title, setTitle] = useState(event ? event.title : '');
    const [date, setDate] = useState(event ? event.date : '');
    const [category, setCategory] = useState(event ? event.category : '');
    const [address, setAddress] = useState(event ? event.address : '');
    const [description, setDescription] = useState(
        event ? event.description : '',
    );
    const [isLoading, setIsLoading] = useState(false);

    const [titleError, setTitleError] = useState(errors.valid);
    const [dateError, setDateError] = useState(errors.valid);
    const [descriptionError, setDescriptionError] = useState(errors.valid);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [buttonBackground, setButtonBackground] = useState('#ddd');

    useEffect(() => {
        if (formIsValid()) {
            if (isButtonDisabled) {
                setIsButtonDisabled(false);
                setButtonBackground('#00f');
            }
        } else {
            if (!isButtonDisabled) {
                setIsButtonDisabled(true);
                setButtonBackground('#ddd');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, date, category, address, description]);

    const addresses = useSelector((state) => state.Addresses);
    const dispatch = useDispatch();

    function formIsValid() {
        return (
            titleError === errors.valid &&
            dateError === errors.valid &&
            descriptionError === errors.valid &&
            title !== '' &&
            date !== '' &&
            category !== '' &&
            address !== '' &&
            description !== ''
        );
    }

    function getEvent(key) {
        return {
            title,
            date,
            category,
            address,
            description,
            eventKey: key,
        };
    }

    async function handleRegister() {
        try {
            setIsLoading(true);
            const uId = auth().currentUser.uid;
            const ref = database().ref(`/events/${uId}`);
            const key = ref.push().key;
            const event = getEvent(key);
            await ref.child(key).set(event);
            dispatch(addEvent(event));
            Toast.show('Evento cadastrado com sucesso');
            setIsLoading(false);
            navigation.replace('CandidateEventsListScreen');
        } catch (e) {
            setIsLoading(false);
            Toast.show('Erro ao cadastrar evento');
        }
    }

    async function handleUpdate() {
        try {
            setIsLoading(true);
            const updatedEvent = getEvent(event.eventKey);
            await database()
                .ref(`/events/${auth().currentUser.uid}/${event.eventKey}`)
                .set(updatedEvent);
            dispatch(updateEvent(updatedEvent));
            Toast.show('Evento atualizado com sucesso');
            setIsLoading(false);
            navigation.goBack();
        } catch (e) {
            setIsLoading(false);
            Toast.show('Erro ao atualizar evento');
        }
    }

    if (isLoading) {
        return (
            <Container>
                <Lottie source={loadAnimation} autoPlay loop />
            </Container>
        );
    }

    return (
        <Container>
            <BackButton action={() => navigation.goBack()} title="dashboard" />
            <Form>
                {titleError === errors.valid && <Text>Título</Text>}
                {titleError === errors.invalidTitle && (
                    <Text color="#f00" size="8px">
                        {titleError.message}
                    </Text>
                )}
                <Input
                    testID="title-input"
                    border={titleError.border}
                    value={title}
                    onChangeText={(title) => {
                        handleInputChange(
                            title,
                            setTitle,
                            () => HasMinChars(title, 8),
                            titleError,
                            setTitleError,
                            errors.invalidTitle,
                        );
                    }}
                />
                {dateError === errors.valid && <Text>Data</Text>}
                {dateError === errors.invalidDate && (
                    <Text color="#f00" size="8px">
                        {dateError.message}
                    </Text>
                )}
                <MaskedInput
                    testID="date-input"
                    border={dateError.border}
                    type={'datetime'}
                    options={{
                        format: 'DD/MM/YYYY',
                    }}
                    value={date}
                    onChangeText={(date) => {
                        handleInputChange(
                            date,
                            setDate,
                            isDate,
                            dateError,
                            setDateError,
                            errors.invalidDate,
                        );
                    }}
                />
                <Text>Categoria</Text>
                <PickerView>
                    <Picker
                        testID="category-input"
                        selectedValue={category}
                        style={{height: 50, width: '100%', color: '#fff'}}
                        onValueChange={(itemValue, itemIndex) =>
                            setCategory(itemValue)
                        }>
                        <Picker.Item
                            key={0}
                            label="Selecione a categoria"
                            value=""
                        />
                        {renderCategories()}
                    </Picker>
                </PickerView>
                <Text>Endereço</Text>
                <PickerView>
                    <Picker
                        testID="address-input"
                        selectedValue={address}
                        style={{height: 50, width: '100%', color: '#fff'}}
                        onValueChange={(itemValue, itemIndex) =>
                            setAddress(itemValue)
                        }>
                        <Picker.Item
                            key={0}
                            label="Selecione o endereço"
                            value=""
                        />
                        {renderAddresses(addresses)}
                    </Picker>
                </PickerView>
                {descriptionError === errors.valid && <Text>Descrição</Text>}
                {descriptionError === errors.invalidDescription && (
                    <Text color="#f00" size="8px">
                        {descriptionError.message}
                    </Text>
                )}
                <MultilineInput
                    testID="description-input"
                    border={descriptionError.border}
                    multiline={true}
                    numberOfLines={20}
                    maxLength={600}
                    value={description}
                    onChangeText={(description) => {
                        handleInputChange(
                            description,
                            setDescription,
                            () => HasMinChars(description, 100),
                            descriptionError,
                            setDescriptionError,
                            errors.invalidDescription,
                        );
                    }}
                />
                <Button
                    testID="register-button"
                    title={event ? 'Atualizar' : 'Cadastrar'}
                    disabled={isButtonDisabled}
                    background={buttonBackground}
                    callback={() => (event ? handleUpdate() : handleRegister())}
                />
            </Form>
        </Container>
    );
};

export default Event;
