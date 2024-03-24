import { theme } from "../theme";

function Footer() {
    return (
        <div style={{ backgroundColor: theme.palette.grey[900],
                    color: theme.palette.grey[100],
                    position: "fixed",
                    bottom: 0,
                    height: "auto",
                    width: "100%",
                    textAlign: "center",
                    padding: 10 }}>
            Created for Operations Research and Logistics course by Arkadiusz Zając, Konrad Warzecha, Krzysztof Stajniak
        </div>
    )
}

export default Footer;