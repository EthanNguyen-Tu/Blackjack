import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    styled,
    tableCellClasses,
    Typography,
    Stack,
    SxProps,
    Theme,
} from "@mui/material";

const StyledDeckContentsCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.contrastText,
        color: theme.palette.common.white,
        textAlign: "center",
        fontSize: "1.2rem",
    },
    [`&.${tableCellClasses.body}`]: {
        borderColor: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
        fontSize: "1rem",
    },
}));

interface DeckContentDisplayProps {
    card_count: { [key: string]: number };
    sx?: SxProps<Theme>;
}

function DeckContentDisplay(props: DeckContentDisplayProps) {
    const { card_count, sx } = props;

    return (
        <Stack direction="column" alignItems="center" sx={{ ...(sx || {}) }}>
            <Typography
                fontSize="1.2rem"
                sx={(theme) => ({ color: theme.palette.common.white })}
            >
                Cards Not Seen
            </Typography>
            <TableContainer sx={{ maxWidth: "300px" }}>
                <Table
                    size="small"
                    aria-label="a dense table displaying remaining cards in the deck"
                >
                    <TableHead>
                        <TableRow>
                            <StyledDeckContentsCell>
                                Card
                            </StyledDeckContentsCell>
                            <StyledDeckContentsCell>#</StyledDeckContentsCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(card_count).map((key) => (
                            <TableRow key={"Remaining Cards"}>
                                <StyledDeckContentsCell align="center">
                                    {key}
                                </StyledDeckContentsCell>
                                <StyledDeckContentsCell
                                    align="center"
                                    sx={{
                                        borderLeft:
                                            "2px solid theme.palette.primary.contrastText",
                                    }}
                                >
                                    {card_count[key]}
                                </StyledDeckContentsCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}

export default DeckContentDisplay;
