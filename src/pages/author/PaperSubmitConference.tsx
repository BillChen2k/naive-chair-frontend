import * as React from 'react';
import useAuth from '@/services/hooks/useAuth';
import {useParams} from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControl, FormControlLabel,
  Grid, IconButton,
  InputLabel,
  LinearProgress,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {useState} from 'react';
import {IPaper, IPaperResearcherInfo} from '@/types/paper.type';
import useAxios from '@/services/hooks/useAxios';
import endpoints from '@/config/endpoints';
import {parseConferences} from '@/types/conference.type';
import styled from '@emotion/styled';
import {IResearcher, parseResearcher} from '@/types/researcher.type';
import {ArrowDownward, ArrowUpward, AssignmentInd, Person, Send} from '@mui/icons-material';
import openSnackBar from '@/store/actions/snackbarActions';
import {useDispatch} from 'react-redux';
import {bool} from 'yup';
import {axiosAuthed} from '@/services/axiosAuthed';


const Input = styled('input')({});

type Props = {};

const PaperSubmitConference: React.FC<Props> = (props) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  if (auth.accessControl(['author'])) {
    return auth.forbidden403;
  };
  const {conferenceId} = useParams();
  const [paper, setPaper] = useState<IPaper>({
    title: 'Your New Paper',
    abstract: 'This is your paper\'s abstract.',
    paperResearchers: [],
    conferenceId: Number(conferenceId),
  });
  type researchInfoMap = {
    [key: string]: IPaperResearcherInfo
  };
  const [pickedResearchers, setPickedResearchers] = useState<string[]>([]);
  const [researcherInfo, setResearcherInfo] = useState<researchInfoMap>({});
  const [created, SetCreated] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const {response, loading, error} = useAxios(endpoints[auth.userObj.role].getConferenceList);
  const {response: responseR, loading: loadingR, error: errorR} = useAxios(endpoints.author.getResearcherList);
  if (loading || loadingR) {
    return <LinearProgress />;
  }
  if (error || errorR) {
    return <div>{error}</div>;
  }
  const conference = parseConferences(response.data).find((c) => c.conferenceId === parseInt(conferenceId));
  const researchers: IResearcher[] = responseR.data.map((r: any) => parseResearcher(r));
  console.log(researchers);

  function handleSubmit() {
    const formData = new FormData();
    const paperAuthors: IPaperResearcherInfo[] = [];
    console.log(researcherInfo);
    // Object to array
    Object.keys(researcherInfo).forEach((key) => {
      paperAuthors.push(researcherInfo[key]);
    });
    paperAuthors.sort((a, b) => a.order - b.order);
    console.warn(paperAuthors);
    formData.append('title', paper.title);
    formData.append('file', selectedFile);
    formData.append('abstract', paper.abstract);
    formData.append('conferenceid', conferenceId);
    formData.append('paper_authors', JSON.stringify(paperAuthors));
    axiosAuthed(endpoints.author.addPaper, formData)
        .then(() => {
          dispatch(openSnackBar('Paper submitted', 'success'));
        // window.location.reload();
        })
        .catch((err) => dispatch(openSnackBar(err.message, 'error')));
    dispatch(openSnackBar('Submitting your paper...', 'info'));
  }

  function handleCorrespondingAuthorChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    const {name} = event.target;
    const newResearcherInfo = {...researcherInfo};
    newResearcherInfo[name].corresponding = checked;
    setResearcherInfo(newResearcherInfo);
  }

  function handleEmailNotifyChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    const {name} = event.target;
    const newResearcherInfo = {...researcherInfo};
    newResearcherInfo[name].notify = checked;
    setResearcherInfo(newResearcherInfo);
  }

  function handleSelectResearcherChange(event: SelectChangeEvent<string>) {
    const value = event.target.value;
    const values = (value === 'string' ? value.split(',') : value) as string[];
    setPickedResearchers(values);
  };

  function renderPickedResearchers() {
    function moveUp(author: string) {
      const index = pickedResearchers.indexOf(author);
      if (index > 0) {
        const newPickedResearchers = [...pickedResearchers];
        newPickedResearchers.splice(index, 1);
        newPickedResearchers.splice(index - 1, 0, author);
        newPickedResearchers.forEach((r, i) => {
          const newResearcherInfo = {...researcherInfo};
          newResearcherInfo[r].order = i;
          setResearcherInfo(newResearcherInfo);
        });
        setPickedResearchers(newPickedResearchers);
      }
    }

    function moveDown(author: string) {
      const index = pickedResearchers.indexOf(author);
      if (index < pickedResearchers.length - 1) {
        const newPickedResearchers = [...pickedResearchers];
        newPickedResearchers.splice(index, 1);
        newPickedResearchers.splice(index + 1, 0, author);
        newPickedResearchers.forEach((r, i) => {
          const newResearcherInfo = {...researcherInfo};
          newResearcherInfo[r].order = i;
          setResearcherInfo(newResearcherInfo);
        });
        setPickedResearchers(newPickedResearchers);
      }
    }

    const render = pickedResearchers.map((r, index) => {
      console.log(pickedResearchers);
      const researcher = researchers.find((researcher) => researcher.name === r);
      const newResearcherInfo = {...researcherInfo};
      if (!newResearcherInfo[r]) {
        newResearcherInfo[r] = {
          notify: false,
          corresponding: false,
          order: index,
          researcherId: researcher.researcherId,
        };
        setResearcherInfo(newResearcherInfo);
      }
      return (
        <ListItem key={r} secondaryAction={
          <Stack direction={'row'} spacing={2}>
            <IconButton onClick={() => moveUp(r)}><ArrowUpward /></IconButton>
            <IconButton onClick={() => moveDown(r)}><ArrowDownward /></IconButton>
            <FormControlLabel control={<Checkbox name={r}
              value={researcherInfo[r] ? researcherInfo[r].corresponding : ''}
              onChange={handleCorrespondingAuthorChange} />}
            label="Corresponding Author" />
            <FormControlLabel control={<Checkbox name={r}
              value={researcherInfo[r] ? researcherInfo[r].notify : ''}
              onChange={handleEmailNotifyChange} />}
            label="Email Notification" />
          </Stack>
        }>
          <ListItemIcon>
            <AssignmentInd />
          </ListItemIcon>
          <ListItemText primary={pickedResearchers.indexOf(r) == 0 ? <b>{r}</b> : r}
            secondary={
              <Box>
                <Typography variant={'body2'}>{researcher.email}</Typography>
                <Typography variant={'body2'}>{researcher.affiliation}</Typography>
              </Box>
            } />
        </ListItem>
      );
    });
    return render;
  }

  return (
    <Stack spacing={2}>
      <Typography variant='h2'>{paper.title}</Typography>
      <Typography variant='body1'>Submitting to: <b>{`${conference.fullName} (${conference.shortName})`}</b> as <b>{auth.userObj.realname}</b>.</Typography>
      <TextField
        label='Title'
        value={paper.title}
        fullWidth
        onChange={(e) => setPaper({...paper, title: e.target.value})}
      />
      <TextField
        label='Abstract'
        value={paper.abstract}
        fullWidth
        multiline
        rows={6}
        onChange={(e) => setPaper({...paper, abstract: e.target.value})}
      />
      <Card variant={'outlined'}>
        <CardContent>
          <Typography variant={'h6'}>Authors</Typography>
          <Typography variant={'body1'}>Select paper author from your researchers. You can manage your researchers beforehand.</Typography>
          <FormControl sx={{m: 1, width: '100%'}}>
            <InputLabel id="select-researcher">Select Researchers</InputLabel>
            <Select
              labelId={'select-researcher'}
              multiple
              value={pickedResearchers}
              onChange={handleSelectResearcherChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected: any) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value: string) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {researchers.map((r, index) => (
                <MenuItem key={index} value={r.name}>
                  <Checkbox checked={pickedResearchers.indexOf(r.name) > -1} />
                  <ListItemText primary={r.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container>
            {renderPickedResearchers()}
          </Grid>
        </CardContent>
      </Card>

      <Stack direction={'row'}>
        <label htmlFor='upload-file'>
          <Button variant='contained' component='span' sx={{mr: 2}}>
            Upload Full Paper
          </Button>
          <Input accept={'application/pdf'} id='upload-file' type='file'
            onChange={(event) => setSelectedFile(event.target.files[0])}
          />
        </label>
        <Box sx={{flexGrow: 1}}></Box>
        <Button variant='contained' color={'secondary'}
          component='span' sx={{mr: 2}}
          startIcon={<Send />}
          onClick={handleSubmit}
        >
           Submit
        </Button>
      </Stack>
      {selectedFile ? (
        <Box>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{' '}
            {selectedFile.lastModified}
          </p>
        </Box>
      ) : (
        <p>Only PDF file is supported.</p>
      )}
    </Stack>
  );
};

export default PaperSubmitConference;
